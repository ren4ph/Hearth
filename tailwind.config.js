/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // If using Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Include components
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
};
