/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#002147',
          darkblue: '#0a192f',
          deep: '#061325',
          saffron: '#FF9933',
          saffronLight: '#FFB366',
          green: '#138808',
          greenLight: '#2ECC71',
          ashoka: '#000080',
          card: '#0f2444',
          cardBorder: '#1e3a66',
          gold: '#FFC107',
          textMuted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
