import { json } from '@sveltejs/kit';
import { sameOriginRequest, setAdminSession, verifyAdminPassword } from '$lib/server/admin-auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url, cookies }) => {
	if (!sameOriginRequest(request, url.origin))
		return json({ error: 'Invalid request origin.' }, { status: 403 });
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid login request.' }, { status: 400 });
	}
	const password =
		body && typeof body === 'object' ? (body as { password?: unknown }).password : undefined;
	if (typeof password !== 'string' || password.length > 1024)
		return json({ error: 'Incorrect password.' }, { status: 401 });
	try {
		if (!verifyAdminPassword(password)) return json({ error: 'Incorrect password.' }, { status: 401 });
		setAdminSession(cookies, url.protocol === 'https:');
		return json({ authenticated: true }, { headers: { 'cache-control': 'no-store' } });
	} catch (error) {
		console.error(
			'[admin-login] Configuration or session error:',
			error instanceof Error ? error.message : 'Unknown server error'
		);
		return json({ error: 'Admin login is not configured correctly.' }, { status: 503 });
	}
};
