/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#171412',
        chocolate: '#35251E',
        coffee: '#654536',
        cappuccino: '#C5A98D',
        cream: '#F2E8DB',
        verdict: {
          reliable: '#5D8A68',
          misleading: '#D49B4B',
          false: '#B85347',
          unverified: '#8A8279'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-warm': '0 8px 30px rgba(23, 20, 18, 0.45)',
        'card-glow': '0 4px 20px rgba(197, 169, 141, 0.08)',
      }
    },
  },
  plugins: [],
}
