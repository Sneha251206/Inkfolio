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
        "primary-light": "#f0f6f4",
        "primary-fixed-dim": "#94d3c1",
        "secondary": "#c85a17",
        "secondary-container": "#fdf3ec",
        "secondary-dark": "#a2450c",
        "accent": "#c85a17",
        "accent-light": "#fdf3ec",
        "surface": "#fbf9f5",
        "surface-container-low": "#f5f2ec",
        "surface-container": "#efece5",
        "surface-container-high": "#e7e3dc",
        "on-surface": "#18181b",
        "on-surface-variant": "#3f3f46",
        "text-muted": "#71717a",
        "divider": "#ebe6df",
        "outline": "#d4cec5"
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
