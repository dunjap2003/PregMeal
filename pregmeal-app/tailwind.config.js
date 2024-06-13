/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Josefin', 'sans-serif'],
      },
      colors:{
        pink: "#db7093",
        lightpink: "#fc8eac",
        darkpink: "#de5285",
        babypink: "#F0D8D8"
      },
      backgroundImage:{
        'homepage': 'url(/assets/homepage.png)'
      }
    },
  },
  plugins: [],
}

