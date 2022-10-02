/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: colors.teal,
        back: colors.slate,
        ...colors
    },
    fontFamily: {
      'sans': ['Poppins', 'Ubuntu', 'Tahoma', '"Helvetica Neue"', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [],
}
