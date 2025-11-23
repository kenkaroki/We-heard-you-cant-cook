import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use the static adapter to output a static site (HTML, CSS, JS files)
		adapter: adapter({
			// The build directory where the output will be placed
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', // Essential for SPAs on GitHub Pages
			precompress: false,
			strict: true
		}),

		// Define the base path for GitHub Pages deployment
		paths: {
			// This MUST match your GitHub repository name (e.g., /My-Repo-Name)
			base: '/We-heard-you-cant-cook',
			assets: ''
		},

		// Ensure all pages are generated during build
		prerender: { handleHttpError: 'warn' }
	}
};

export default config;
