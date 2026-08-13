/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A1008',
          primary: '#FF6600',
          'primary-dark': '#E85D04',
          accent: '#FF3C00',
          surface: '#FFFAF7',
          muted: '#6B5E58',
        },
      },
    },
  },
  plugins: [],
};
