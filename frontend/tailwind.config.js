/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF7629',
        'primary-blue': '#0066FF',
        'primary-pink': '#EC368D',
        'secondary-blue': '#CCE0FF',
        'primary-white': '#FFFFFF',
        'primary-black': '#000000',
      },
    },
  },
  plugins: [],
};
