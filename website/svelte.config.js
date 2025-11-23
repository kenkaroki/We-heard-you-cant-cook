// Change this import to the specific adapter
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Now using adapter-node
		adapter: adapter({
			// Specify the output directory here
			out: 'build'
		}),
		paths: {
			base: '/cantcook'
		}
	}
};

export default config;
