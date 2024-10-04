/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	mode: "jit",
	theme: {
	  extend: {
		fontFamily: {
		  inter: ["Inter", "sans-serif"],
		},
		colors: {
		  'black-100': '#2B2C35',
		  'primary-red': '#e73606',
		  'hard-red': '#4b1304',
		  'primary-blue': {
			'100': '#F5F8FF',
			DEFAULT: '#2B59FF',
		  },
		  'secondary-orange': '#f79761',
		  'light-white': {
			'100': 'rgba(59,60,152,0.02)',
			DEFAULT: 'rgba(59,60,152,0.03)',
		  },
		  grey: '#101010',
		  background: '#0b0b0b',
		  customGrey: '#0c0c0c',
		  subtitle__grey: '#929292',
		  subsection__grey: '#1a1a1a',
		  grey__border: '#3d3d3d',
		  light__grey: '#f5f5f5',
		  white__bg: '#f4f5f7',
		  footer: '#121212',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))',
		  },
		},
		backgroundImage: {
		  pattern: "url('/pattern.png')", // Use double quotes inside url()
		  'hero-bg': "url('/hero-bg.png')", // Use double quotes inside url()
		},
		boxShadow: {
		  'weak-ass-glow': '0 0 15px 5px rgba(100, 100, 100, 0.5)',
		  'glow-red': '0 0 15px 5px rgba(231, 33, 6, 0.2)',
		  glow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
	  },
	  plugins: [],
	},
	plugins: [require("tailwindcss-animate")],
  };
  