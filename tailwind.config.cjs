/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 5s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) skewX(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) skewX(6deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) skewX(0deg) scale(1)' },
        },
      },
      blur: {
        '4xl': '100px',
      },
    },
  },
  plugins: [],
};
