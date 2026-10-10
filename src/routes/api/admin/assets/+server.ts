import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { randomUUID } from 'node:crypto';
import { isAdminSessionValid, sameOriginRequest } from '$lib/server/admin-auth';
import type { RequestHandler } from './$types';

const BUCKET = 'site-assets';
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const IMAGE_TYPES: Record<string, { extension: string; signature: (bytes: Buffer) => boolean }> = {
	'image/png': {
		extension: 'png',
		signature: (bytes) =>
			bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
	},
	'image/jpeg': {
		extension: 'jpg',
		signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
	},
	'image/webp': {
		extension: 'webp',
		signature: (bytes) =>
			bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
	}
};

export const POST: RequestHandler = async ({ request, url, cookies }) => {
	if (!sameOriginRequest(request, url.origin))
		return json({ error: 'Invalid request origin.' }, { status: 403 });
	if (!isAdminSessionValid(cookies))
		return json({ error: 'Sign in to upload images.' }, { status: 401 });

	try {
		const form = await request.formData();
		const file = form.get('file');
		if (!(file instanceof File) || file.size === 0 || file.size > MAX_FILE_SIZE)
			return json({ error: 'Choose an image smaller than 3 MB.' }, { status: 400 });

		const imageType = IMAGE_TYPES[file.type];
		if (!imageType) return json({ error: 'Use a PNG, JPG, or WebP image.' }, { status: 400 });
		const bytes = Buffer.from(await file.arrayBuffer());
		if (!imageType.signature(bytes))
			return json({ error: 'The selected file is not a valid image.' }, { status: 400 });

		const client = createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
			auth: { autoRefreshToken: false, persistSession: false }
		});
		const path = `${randomUUID()}.${imageType.extension}`;
		const { data, error } = await client.storage.from(BUCKET).upload(path, bytes, {
			cacheControl: '31536000',
			contentType: file.type,
			upsert: false
		});
		if (error) throw error;
		const { data: publicAsset } = client.storage.from(BUCKET).getPublicUrl(data.path);
		return json({ url: publicAsset.publicUrl });
	} catch {
		return json(
			{ error: 'Upload failed. Check the site storage setup and try again.' },
			{ status: 503 }
		);
	}
};
