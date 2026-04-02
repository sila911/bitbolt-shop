/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        dark: '#2f2454',
        navy: '#4a3c82',
        deep: '#7b61ff',
        slate: '#a9b8ff',
        gray: '#c9c0e6',
        light: '#f7f4ff',
        primary: '#7b61ff',
        secondary: '#ff8fcb',
        asset: '#a9b8ff',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}