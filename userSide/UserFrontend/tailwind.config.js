/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        robotoCondensed: ['Roboto Condensed', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        crimson: ['Crimson Text', 'serif'],
        lobster: ['Lobster', 'cursive'],
        anton: ['Anton', 'sans-serif'],
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-4px)' },
        },
      },
    },
  },
  plugins: [

  ],
}
