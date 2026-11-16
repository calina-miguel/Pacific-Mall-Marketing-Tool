/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pm-purple': '#321c65',
        'pm-purple-dark': '#231349',
        'pm-purple-light': '#482a8e',
        'pm-magenta': '#b60090',
        'pm-magenta-hover': '#9e007d',
        'pm-green': '#26aa00',
        'pm-green-light': '#eaf8e6',
        'pm-bg': '#f7f6fa',
        'pm-card': '#ffffff',
        'pm-dark': '#1a1429',
        'pm-border': 'rgba(50, 28, 101, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
      },
      boxShadow: {
        'pm-btn': 'rgba(255, 255, 255, 0.25) 0px 1px 1px 0px inset, rgba(50, 28, 101, 0.3) 0px 4px 14px 0px',
        'pm-card': '0px 10px 30px -10px rgba(50, 28, 101, 0.06)',
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
