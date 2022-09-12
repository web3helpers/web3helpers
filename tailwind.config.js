const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./blocks/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["M PLUS 2", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        transparent: "transparent",
        primary: "#4A68A1",
        evm: "#F7A300",
        filecoin: "#008BF7",
        solana: "#933FFD",
        bitcoin: "#F7A300",
        error: colors.red[700]
      }
    }
  },
  plugins: []
};
