/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'tiny': { 'min': '500px' },
        'sm': { 'min': '600px' },
        '1xl': { 'min': '1440px' },
        '2xl': { 'min': '1800px' },
        '3xl': { 'min': '1600px' },
        '4xl': { 'min': '1360px' },
      },
      colors: {
        'black1': '#303030',
        'black2': '#272727',
        'black3': '#ACACAC',
        'black4': '#F2F3F7',
        'black5': '#4A4A4A',
        'black6': '#DBDBDB',
        'black7': '#272727',
        'black8': '#505050',
        'green1': '#EBF76E',
        'pink1': '#FF80D3',
        'menuback': 'rgba(0, 0, 0, 0.32)',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

