const { keyframes } = require("framer-motion");

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
      // Adds a custom min-width of 700px
      minWidth: {
        custom: "700px",
      },
      // Custom breakpoints
      screens: {
        smp: "890px", // Custom breakpoint at 890px
        "1600": "1600px", // Custom breakpoint at 1600px
      },
      // Custom font family
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      // Custom colors
      colors: {
        "black-100": "#2B2C35",
        "primary-red": "#e73606",
        "secondary-red": "#FF7F50",
        "hard-red": "#4b1304",
        "secondary-blue": "#06B6D4",
        "not-black": "#0e0e0e",
        "primary-blue": {
          100: "#F5F8FF",
          DEFAULT: "#2B59FF",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          100: "rgba(59,60,152,0.02)",
          DEFAULT: "rgba(59,60,152,0.03)",
        },
        grey: "#101010",
        background: "#0b0b0b",
        customGrey: "#0c0c0c",
        subtitle__gray: "#929292",
        subsection__gray: "#1a1a1a",
        grey__border: "#3d3d3d",
        light__grey: "#f5f5f5",
        white__bg: "#f4f5f7",
        footer: "#121212",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      // Custom background images
      backgroundImage: {
        pattern: "url('/pattern.png')", // Use double quotes inside url()
        "hero-bg": "url('/hero-bg.png')", // Use double quotes inside url()
      },
      // Custom box shadows
      boxShadow: {
        "weak-ass-glow": "0 0 15px 5px rgba(180, 180, 180, 0.5)",
        "glow-red": "0 0 15px 5px rgba(231, 33, 6, 0.3)",
        "glow-slight-red": "0 0 15px 5px rgba(255, 166, 0, 0.3)",
        "glow-purple": "0 0 15px 5px rgba(147, 51, 234, 0.6)",
        "glow-pink": "0 0 15px 5px rgba(236, 72, 153, 0.6)",
        glow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
      },
      // Custom border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Adds a custom meteor animation
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      // Keyframes for meteor animation
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
