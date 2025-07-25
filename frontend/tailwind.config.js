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
        // Cursor-like dark theme colors
        'cursor-bg': '#0d1117',
        'cursor-surface': '#161b22',
        'cursor-border': '#30363d',
        'cursor-text': '#c9d1d9',
        'cursor-text-muted': '#8b949e',
        'cursor-accent': '#58a6ff',
        'cursor-accent-muted': '#1f6feb',
        'cursor-success': '#238636',
        'cursor-warning': '#d29922',
        'cursor-error': '#f85149',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['0.9375rem', { lineHeight: '1.5rem' }], // Slightly smaller base
        'lg': ['1.0625rem', { lineHeight: '1.75rem' }],
        'xl': ['1.1875rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.3125rem', { lineHeight: '2rem' }],
      },
    },
  },
  plugins: [],
}
