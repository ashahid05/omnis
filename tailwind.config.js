/** @type {import('tailwindcss').Config} */
const colors = require("./tailwind.colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./**/*.tsx", "./app/**/*.tsx"],
  theme: {
    extend: { colors },
    fontFamily: {
      logo: ["Goldman"],
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".v-hidden": {
          visibility: "hidden",
        },
        ".z-1": {
          "z-index": 1,
        },
      });
    }),
  ],
};
