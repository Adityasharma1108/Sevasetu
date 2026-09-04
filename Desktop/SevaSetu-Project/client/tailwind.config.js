/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#0a0f1c', 
        surface: '#151c2f', 
        primary: {
          DEFAULT: '#3b82f6', 
          glow: 'rgba(59, 130, 246, 0.5)'
        },
        accent: {
          DEFAULT: '#10b981', 
          glow: 'rgba(16, 185, 129, 0.5)'
        }
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}