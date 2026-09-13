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
        win: {
          bg: '#181818',
          surface: '#202020',
          elevated: '#282828',
          card: '#2c2c2c',
          cardHover: '#333333',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: 'rgba(255, 255, 255, 0.05)',
          borderFocus: 'rgba(255, 255, 255, 0.2)',
          accent: '#0078d4',
          accentHover: '#1084d9',
          accentActive: '#0067b8',
          accentLight: 'rgba(0, 120, 212, 0.15)',
          closeHover: '#e81123',
          closeActive: '#f1707a',
          text: '#ffffff',
          muted: '#cccccc',
          dim: '#8a8a8a',
          lightBg: '#f3f3f3',
          lightSurface: '#ffffff',
          lightCard: '#fbfbfb',
          lightBorder: '#e5e5e5',
          lightText: '#1f1f1f',
          lightMuted: '#5c5c5c',
        },
        // Keep os color tokens as aliases to maintain backwards-compatibility across components
        os: {
          bg: '#181818',
          surface: '#202020',
          card: '#2c2c2c',
          border: 'rgba(255, 255, 255, 0.09)',
          'border-focus': 'rgba(255, 255, 255, 0.22)',
          accent: '#0078d4',
          'accent-glow': 'rgba(0, 120, 212, 0.2)',
          neural: '#60cdff',
          emerald: '#107c41',
          amber: '#d83b01',
          rose: '#e81123',
          text: '#ffffff',
          muted: '#cccccc',
          dim: '#8a8a8a',
        }
      },
      fontFamily: {
        sans: ['Segoe UI Variable', 'Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['Cascadia Code', 'Consolas', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'win-window': '0 18px 45px rgba(0, 0, 0, 0.45), 0 0 1px rgba(255, 255, 255, 0.12)',
        'win-active': '0 24px 60px rgba(0, 0, 0, 0.55), 0 0 1px rgba(0, 120, 212, 0.5), 0 0 0 1px rgba(0, 120, 212, 0.3)',
        'win-flyout': '0 12px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'win-taskbar': '0 -2px 10px rgba(0, 0, 0, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.06)',
        'window': '0 18px 45px rgba(0, 0, 0, 0.45), 0 0 1px rgba(255, 255, 255, 0.12)',
        'window-active': '0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 120, 212, 0.35)',
        'dock': '0 -2px 10px rgba(0, 0, 0, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.06)',
      },
      borderRadius: {
        'win': '8px',
      }
    },
  },
  plugins: [],
}
