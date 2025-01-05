import tailwindForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Trirong', 'serif'],
        sacramento: ['Sacramento', 'cursive'],
      },
    },
  },
  plugins: [tailwindForms],
};
