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
  ],
}

