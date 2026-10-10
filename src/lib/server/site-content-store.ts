import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { DEFAULT_SITE_CONTENT, parseSiteContent, type SiteContent } from '$lib/site-content';

function getSupabase() {
	const url = env.SUPABASE_URL;
	const key = env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !key)
		throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.');
	return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function readSiteContent(): Promise<SiteContent> {
	if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return { ...DEFAULT_SITE_CONTENT };
	const { data, error } = await getSupabase()
		.from('site_content')
		.select('content')
		.eq('id', 1)
		.maybeSingle();
	if (error) throw error;
	if (!data) return { ...DEFAULT_SITE_CONTENT };
	return parseSiteContent(data.content) ?? { ...DEFAULT_SITE_CONTENT };
}

export async function writeSiteContent(content: SiteContent): Promise<SiteContent> {
	const { data, error } = await getSupabase()
		.from('site_content')
		.upsert({ id: 1, content, updated_at: new Date().toISOString() })
		.select('content')
		.single();
	if (error) throw error;
	return parseSiteContent(data.content) ?? content;
}
