/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			body: ['Roboto', 'Arial', 'sans-serif'], // For bodies of text
			heading: ['Montserrat', 'Arial', 'sans-serif'], // For headings
			sans: ['Open Sans', 'Arial', 'sans-serif'] // for accents like button and such
		},
		extend: {}
	},
	plugins: []
};
