const colors = require("tailwindcss/colors");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./blocks/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["M PLUS 2", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      transparent: "transparent",
      primary: "#4A68A1",
      evm: "#F7A300",
      filecoin: "#008BF7",
      solana: "#933FFD",
      purple: colors.purple,
      green: colors.green,
      blue: colors.blue,
      stone: colors.stone,
      white: colors.white,
      gray: colors.gray,
      black: colors.black,
      red: colors.red,
    },
  },
  plugins: [],
};
