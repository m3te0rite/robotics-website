import { DEFAULT_SITE_CONTENT, type SiteContent } from '$lib/site-content';

export const siteContent = $state<SiteContent>({ ...DEFAULT_SITE_CONTENT });

function applyContent(value: Partial<SiteContent>) {
	Object.assign(siteContent, { ...DEFAULT_SITE_CONTENT, ...value });
}

export async function loadSiteContent() {
	const response = await fetch('/api/site-content', { cache: 'no-store' });
	if (!response.ok) throw new Error('Unable to load site content.');
	applyContent(await response.json());
}

export async function saveSiteContent() {
	const response = await fetch('/api/site-content', {
		method: 'PUT',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(siteContent)
	});
	if (!response.ok) throw new Error(response.status === 401 ? 'Your session expired. Sign in again.' : 'Unable to save site content.');
	applyContent(await response.json());
}