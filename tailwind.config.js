/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/pages/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': '#1A1A1A',
        'fluorescent-cyan': '#16FEED',
        'dim-gray': '#AAAAAA',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}