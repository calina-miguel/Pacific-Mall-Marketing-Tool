/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ad-bg': '#f7f7f7',
        'ad-dark': '#1a1a1a',
        'ad-purple': '#8554ff',
        'ad-purple-hover': '#7442f5',
        'ad-gray': '#888888',
        'ad-card': '#ffffff',
        'ad-card-dark': '#1a1a1a',
        'ad-border': 'rgba(26, 26, 26, 0.08)',
        'ad-border-dark': 'rgba(255, 255, 255, 0.1)',
        'pm-blue': '#003366',
        'pm-accent': '#FFCC00',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
      },
      boxShadow: {
        'ad-btn': 'rgba(255, 255, 255, 0.25) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.06) 0px 4px 12px 0px',
        'ad-card': '0px 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'ad-card-hover': '0px 20px 40px -15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'ad': '16px',
        'ad-lg': '24px',
        'ad-pill': '9999px',
      }
    },
  },
  plugins: [],
}
