import { json } from '@sveltejs/kit';
import { clearAdminSession, isAdminSessionValid, sameOriginRequest } from '$lib/server/admin-auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) =>
	json(
		{ authenticated: isAdminSessionValid(cookies) },
		{ headers: { 'cache-control': 'no-store' } }
	);

export const DELETE: RequestHandler = ({ cookies, request, url }) => {
	if (!sameOriginRequest(request, url.origin))
		return json({ error: 'Invalid request origin.' }, { status: 403 });
	clearAdminSession(cookies);
	return json({ authenticated: false }, { headers: { 'cache-control': 'no-store' } });
};
