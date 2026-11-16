/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pm-blue': '#003366',
        'pm-accent': '#FFCC00',
        'pm-bg': '#F4F7F9',
        'pm-dark': '#1A1A1A',
      },
      fontSize: {
        'display': ['2.5rem', { fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline': ['1.5rem', { fontWeight: '600', letterSpacing: '-0.01em' }],
      }
    },
  },
  plugins: [],
}
