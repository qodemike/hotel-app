/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Inter', 'san-serif'],
        'inter': ['Inter'],
        'poppins':['Poppins'],
        'jost': ['jost'],
      },
      colors:{
        primary: '#191818',
        secondary: '#fcfcf9',
        accent: '#222222',
        silver: '#ECECEC',
        grayedText: '#9ca3af'

      }
    },
  },
  plugins: [],
};
