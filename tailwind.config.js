/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      'robt': ['Roboto', 'sans-serif'],
      'monts': ['Montserrat', 'sans-serif'],
      'redsans': ['Reddit Sans', 'sans-serif'],
    },
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {
      colors: {
        'darkSection': "#0C0F1D",
        'darkBG': "#020617",
      },
    }
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }

