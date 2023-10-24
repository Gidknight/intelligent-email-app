/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	mode: "jit",
	theme: {
		extend: {
			colors: {
				primary: "blue",
				primaryLight: "rgba(255, 255, 255, 0.7)",
				primaryDark: "#002984",
				secondary: "blue",
				tertiary: "#FF7754",
				transcript: "red",
				gray1: "#83829A",
				gray2: "#C1C0C8",
				textSecondary: "#000",
				dimWhite: "#F3F4F8",
				lightWhite: "#FAFAFC",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			gridTemplateColumns: {
				sidebar: "300px auto", //for sidebar layout
				"sidebar-collapsed": "64px auto", //for collapsed sidebar layout
			},
		},
		screens: {
			xs: "480px",
			ss: "620px",
			sm: "768px",
			md: "1060px",
			lg: "1200px",
			xl: "1700px",
		},
	},
	plugins: [],
};
