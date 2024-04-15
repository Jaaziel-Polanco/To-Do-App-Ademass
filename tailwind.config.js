import { addDynamicIconSelectors } from '@iconify/tailwind';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient2 : 'linear-gradient(to left, #4CAF50, #FF5722)',
      },
      textShadow: {
        default: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '3px 3px 5px rgba(0, 0, 0, 0.5)',
        xl: '5px 5px 10px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#4CAF50',
        secondary:'#FF5722',
        textPrimary: '#333333',
        textSecondary: '#757575',
        },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    addDynamicIconSelectors(),
    require('tailwindcss-textshadow'),
  ],
}

