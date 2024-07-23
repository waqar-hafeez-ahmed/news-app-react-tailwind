/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["BBC Reith Sans", "Helvetica", "Arial", "sans-serif"],
        serif: ["BBC Reith Serif", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
