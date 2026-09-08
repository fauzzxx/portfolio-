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
        os: {
          bg: '#07090e',
          surface: '#0d1117',
          card: '#131822',
          border: '#1e2638',
          'border-focus': '#334155',
          accent: '#00e5ff',
          'accent-glow': 'rgba(0, 229, 255, 0.15)',
          neural: '#6366f1',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          text: '#f1f5f9',
          muted: '#8b9bb4',
          dim: '#475569',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'window': '0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'window-active': '0 30px 80px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(0, 229, 255, 0.3), 0 0 30px -10px rgba(0, 229, 255, 0.2)',
        'dock': '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
