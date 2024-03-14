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
        lightpink: "#ffc0cb",
        darkpink: "#de5285"
      },
      backgroundImage:{
        'homepage': 'url(/assets/homepage.png)'
      }
    },
  },
  plugins: [],
}

