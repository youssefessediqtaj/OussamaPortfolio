/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#111111',
          secondary: '#161616',
          dark: '#0A0A0A',
          card: '#141414',
        },
        text: {
          primary: '#F1F1F1',
          secondary: '#8C8C8C',
          muted: '#5A5A5A',
        },
        accent: {
          red: '#B93434',
          darkred: '#681D1D',
          glow: 'rgba(185, 52, 52, 0.25)',
          subtle: 'rgba(185, 52, 52, 0.12)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.18)',
          faint: 'rgba(255, 255, 255, 0.08)',
          red: 'rgba(185, 52, 52, 0.4)',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.25em',
        widest: '0.15em',
        tighter: '-0.04em',
      },
      lineHeight: {
        tightest: '0.85',
        condensed: '0.92',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(180deg, rgba(185, 52, 52, 0.15) 0%, rgba(17, 17, 17, 0) 100%)',
        'vignette': 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
      }
    },
  },
  plugins: [],
}
