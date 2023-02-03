/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'splash-md': '5rem',
        'splash-sm': '2.75rem',
        'landing-2-md': '3rem',
        'landing-2-sm': '2rem',
      }
    },
  },
  plugins: [],
}
