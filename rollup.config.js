import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/svelte.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
		svelte({
			preprocess: autoPreprocess({
				sourceMap: true,
				postcss: {
					// syntax: "postcss-scss",
					plugins: [
						require("tailwindcss/nesting"),
						require("tailwindcss"),
						require("autoprefixer"),
					]
				},
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
			// we'll extract any component CSS out into
			// a separate file - better for performance
			emitCss: true,
			onwarn: (warning, handler) => {
				const {code, frame} = warning;
				if (code === "css-unused-selector") return;
				handler(warning);
			}
		}),
		typescript({ sourceMap: !production}),
		css({output: "bundle.css"}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		// scss({
		// 	sourceMap: true,
		// 	prefix: `@use 'sass:math';
		// 			 @use 'sass:color';`,
		// }),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({
			watch: 'public',
			delay: 750,
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'svelte-start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}