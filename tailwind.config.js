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
        evm: "#D1B0FB",
        filecoin: "#008BF7",
        solana: "#933FFD",
        bitcoin: "#F7A300",
        substrate: "#24CC85",
        aptos: "#2ed8a7",
        sui: "#6fbcf0",
        aleo: "#00C0F9",
        error: colors.red[700]
      }
    }
  },
  plugins: []
};
