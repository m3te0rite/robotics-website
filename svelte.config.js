import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		prerender: {
				handleMissingId: 'warn',
				handleHttpError: ({ path, referrer, message }) => {
					if (path === '/favicon.png') return;
					throw new Error(message);
				}
			}
	}
};

export default config;
