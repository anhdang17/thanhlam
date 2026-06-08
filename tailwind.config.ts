import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#233547",
          50: "#4a6378",
          100: "#435b6e",
          200: "#3a5163",
          300: "#324759",
          400: "#2b3d4e",
          500: "#233547",
          600: "#1c2a3a",
          700: "#161f2c",
          800: "#0f141d",
          900: "#080b0f",
        },
        secondary: {
          DEFAULT: "#2C435A",
          50: "#5a7a9a",
          100: "#50708a",
          200: "#46657b",
          300: "#3c5b6b",
          400: "#33515c",
          500: "#2C435A",
          600: "#233549",
          700: "#1a2838",
          800: "#121b26",
          900: "#090e15",
        },
        accent: {
          DEFAULT: "#F57C2C",
          hover: "#FF9B4A",
          50: "#fde4cd",
          100: "#fcd8b7",
          200: "#fbcca1",
          300: "#fac08b",
          400: "#f9b475",
          500: "#F57C2C",
          600: "#d4691f",
          700: "#b35818",
          800: "#924712",
          900: "#71360d",
        },
        background: {
          DEFAULT: "#0F1720",
          secondary: "#1A2635",
          tertiary: "#233547",
        },
        card: "#1A2635",
        border: "#31465A",
        text: "#FFFFFF",
        "text-secondary": "#B6C2CF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.4)",
        accent: "0 4px 20px rgba(245,124,44,0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
