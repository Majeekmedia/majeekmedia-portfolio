module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#eff6ff",
          600: "#2563eb", // brighter tech blue
          700: "#1d4ed8",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};