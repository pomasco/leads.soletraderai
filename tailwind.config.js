/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Manrope"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        'dark-purple': 'var(--dark-purple)',
        'dark-cyan': 'var(--dark-cyan)',
        'caribbean-current': 'var(--caribbean-current)',
        'celadon': 'var(--celadon)',
        'seasalt': 'var(--seasalt)',
      },
    },
  },
  plugins: [],
};
