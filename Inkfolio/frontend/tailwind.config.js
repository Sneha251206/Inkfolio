/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00342b",
        "primary-container": "#004d40",
        "primary-fixed-dim": "#94d3c1",
        "secondary": "#a83900",
        "secondary-container": "#fc6018",
        "on-secondary-container": "#531800",
        "surface": "#fcf9f8",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#3f4945",
        "text-muted": "#6B6B6B",
        "divider": "#E6E6E6",
        "outline": "#707975"
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
