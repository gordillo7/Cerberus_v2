/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f0f',
        'dark-sidebar': '#1a1a1a',
        'dark-card': '#252525',
        'primary': '#ff6b00',
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}
