import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

const COOKIE_NAME = 'site_admin_session';
const SESSION_SECONDS = 60 * 60 * 12;

function sessionSecret() {
	const supabaseSecret = env.SUPABASE_SERVICE_ROLE_KEY;
	if (!supabaseSecret) throw new Error('Supabase storage is not configured.');
	return createHmac('sha256', supabaseSecret)
		.update('robotics-team-site:admin-session:v1')
		.digest('base64url');
}

function sign(value: string, secret: string) {
	return createHmac('sha256', secret).update(value).digest('base64url');
}

function secureEqual(left: string, right: string, secret: string) {
	const leftHash = createHmac('sha256', secret).update(left).digest();
	const rightHash = createHmac('sha256', secret).update(right).digest();
	return timingSafeEqual(leftHash, rightHash);
}

export function verifyAdminPassword(password: string) {
	const configuredPassword = env.ADMIN_PASSWORD;
	if (!configuredPassword) throw new Error('ADMIN_PASSWORD is not configured.');
	if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY)
		throw new Error('Supabase storage is not configured.');
	return secureEqual(password, configuredPassword, sessionSecret());
}

export function setAdminSession(cookies: Cookies, secure: boolean) {
	const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
	const payload = `admin:${expiresAt}`;
	cookies.set(COOKIE_NAME, `${expiresAt}.${sign(payload, sessionSecret())}`, {
		httpOnly: true,
		secure,
		sameSite: 'strict',
		path: '/',
		maxAge: SESSION_SECONDS
	});
}

export function clearAdminSession(cookies: Cookies) {
	cookies.delete(COOKIE_NAME, { path: '/' });
}

export function isAdminSessionValid(cookies: Cookies) {
	const token = cookies.get(COOKIE_NAME);
	if (!token) return false;
	const [expiresText, signature, extra] = token.split('.');
	if (extra !== undefined || !/^\d+$/.test(expiresText ?? '') || !signature) return false;
	const expiresAt = Number(expiresText);
	if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
	try {
		const secret = sessionSecret();
		return secureEqual(signature, sign(`admin:${expiresAt}`, secret), secret);
	} catch {
		return false;
	}
}

export function sameOriginRequest(request: Request, origin: string) {
	return request.headers.get('origin') === origin;
}
