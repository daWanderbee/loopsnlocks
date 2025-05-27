import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",           // For Next.js App Router
    "./components/**/*.{js,ts,jsx,tsx}",    // For your UI components
    "./pages/**/*.{js,ts,jsx,tsx}",         // If using old pages directory
    "./node_modules/@heroui/theme/dist/components/**/*.{js,ts,jsx,tsx}", // HeroUI components

    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ntr)', 'sans-serif'], // Default font
        moul: ['var(--font-moul)'],
        ntr: ['var(--font-ntr)', 'sans-serif'],
      },
      colors: {
        darkPink:'#F49BAB',
        darkPurple:'#7F55B1',
        lightPink: '#FFE1E0',
        lightPurple: '#9B7EBD'
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
