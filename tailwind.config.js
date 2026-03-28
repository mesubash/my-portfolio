/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        bg: { DEFAULT: "#07080c", card: "#0c0d12", raised: "#12131a" },
        indigo: { DEFAULT: "#6366f1", light: "#818cf8", dark: "#4f46e5" },
        cyan: { DEFAULT: "#22d3ee", light: "#67e8f9", dark: "#06b6d4" },
      },
    },
  },
  plugins: [],
};
