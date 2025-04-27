import tailwindcss from '@tailwindcss/vite';
import dsv from "@rollup/plugin-dsv";

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), dsv()]
});
