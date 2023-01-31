const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'bred': '#E23C3C',
            'bred-2': '#DF2A2A',
            'bgray-bg': '#0a0a0a',
            'bgray-border': '#2a2a2a',
            'bgray-secondary': '#111111',
            'bgray-overlay': '#272a35',
            'bgray-forward':'#393D4C',
            'bgray-dropdown':'#191a20',
        },
        fontFamily: {
            sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}