/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: '#1C1046',
        accent: '#5F2EEA',
        light: {
          100: '#EDE9FE',
          200: '#CCC2DC',
          300: '#A59BC9',
        },
        dark: {
          100: '#3B0764',
          200: '#2D014B',
          300: '#1F0033',
        }
      }
    },
  },
  plugins: [],
}