import { json } from '@sveltejs/kit';
import { sameOriginRequest, setAdminSession, verifyAdminPassword } from '$lib/server/admin-auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url, cookies }) => {
	if (!sameOriginRequest(request, url.origin))
		return json({ error: 'Invalid request origin.' }, { status: 403 });
	try {
		const body: unknown = await request.json();
		const password =
			body && typeof body === 'object' ? (body as { password?: unknown }).password : undefined;
		if (typeof password !== 'string' || password.length > 1024 || !verifyAdminPassword(password)) {
			return json({ error: 'Incorrect password.' }, { status: 401 });
		}
		setAdminSession(cookies, url.protocol === 'https:');
		return json({ authenticated: true }, { headers: { 'cache-control': 'no-store' } });
	} catch {
		return json({ error: 'Admin login is not configured correctly.' }, { status: 503 });
	}
};
