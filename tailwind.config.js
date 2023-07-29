/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
      "./index.html",
      "./src/**/*.{vue, js, ts, jsx, tsx}"
  ],
  theme: {
    extend: {},
  },
    screens: {
        'xs': '320px',
        ...defaultTheme.screens,
    },
  plugins: [],
}

