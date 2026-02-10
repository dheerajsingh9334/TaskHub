export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffdf7",
          100: "#fef9ec",
        },
        brand: {
          gold: "#d4a847",
          "gold-light": "#f0d98a",
          "gold-dark": "#b8912e",
          accent: "#2c7a50",
          "accent-light": "#3d9e68",
          danger: "#c0392b",
          "danger-light": "#e74c3c",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
