/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FFFFFF',
          pure: '#FFFFFF',
          subtle: '#F9F9F8',
          muted: '#F4F4F1',
          card: '#FFFFFF',
          dark: '#0A0A0A',
          border: '#E5E5E2',
          borderSubtle: '#EEEEEC',
          borderHover: '#D4D4D0',
        },
        brand: {
          orange: '#E8592B',
          orangeHover: '#D6491E',
          orangeLight: '#FFF4EE',
          dark: '#0A0A0A',
          charcoal: '#1A1D20',
          sand: '#F7F6F2',
        },
        ink: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#6B7280',
          faint: '#9CA3AF',
          inverted: '#FFFFFF',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.12em',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
