import { json } from '@sveltejs/kit';
import { isAdminSessionValid, sameOriginRequest } from '$lib/server/admin-auth';
import { parseSiteContent } from '$lib/site-content';
import { readSiteContent, writeSiteContent } from '$lib/server/site-content-store';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		return json(await readSiteContent(), { headers: { 'cache-control': 'no-store' } });
	} catch {
		return json(
			{ error: 'Unable to load site content.' },
			{ status: 503, headers: { 'cache-control': 'no-store' } }
		);
	}
};

export const PUT: RequestHandler = async ({ request, url, cookies }) => {
	if (!sameOriginRequest(request, url.origin))
		return json({ error: 'Invalid request origin.' }, { status: 403 });
	if (!isAdminSessionValid(cookies))
		return json({ error: 'Sign in to edit site content.' }, { status: 401 });
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid content.' }, { status: 400 });
	}
	const content = parseSiteContent(body);
	if (!content)
		return json(
			{ error: 'Content fields must be text and under 2,000 characters.' },
			{ status: 400 }
		);
	try {
		return json(await writeSiteContent(content), { headers: { 'cache-control': 'no-store' } });
	} catch {
		return json({ error: 'Unable to save site content.' }, { status: 503 });
	}
};
