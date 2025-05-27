/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkPink:'#F49BAB',
        darkPurple:'#7F55B1',
        lightPink: '#FFE1E0',
        lightPurple: '#9#B7EBD'
      },
    },
  },
  plugins: [],
};
