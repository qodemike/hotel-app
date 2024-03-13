/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Inter', 'san-serif'],
        'inter': ['Inter'],
        'mont': ['Montserrat'],
        'poppins':['Poppins'],
        'jost': ['jost'],
      },
      colors:{
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        card: 'var(--card)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
};
