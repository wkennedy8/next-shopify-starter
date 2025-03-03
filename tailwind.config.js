/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		// screens: {
		// 	sm: '480px',
		// 	md: '768px',
		// 	lg: '976px',
		// 	xl: '1440px'
		// },
		colors: {
			'light-beige': '#ebe4da',
			beige: '#d5b29a',
			'light-green': '#87a84a',
			orange: '#f9a432',
			beet: '#a53c51',
			'light-beet': '#cc2572',
			'dark-green': '#384f1e',
			green: '#4a9f3f',
			black: '#000000',
			white: '#ffffff',
			'light-orange': '#F3CDA9',
			charcoal: '#3d4246'
			// blue: '#1fb6ff',
			// purple: '#7e5bef',
			// pink: '#ff49db',
			// orange: '#ff7849',
			// green: '#13ce66',
			// yellow: '#ffc82c',
			// 'gray-dark': '#273444',
			// gray: '#8492a6',
			// 'gray-light': '#d3dce6'
		},
		extend: {
			fontFamily: {
				babeSans: ['BabeSans', 'sans-serif']
			},
			backgroundImage: {
				'hero-pattern': "url('/images/hero.jpeg')"
			}
		}
	},
	plugins: []
};
