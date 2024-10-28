/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#67e8f9",
        secondary: "#164e63",
      },
      fontSize: {
        xxs: "0.6rem",
        xxxs: "0.45rem",
      },
      backgroundImage: {
        shopping: "url('./images/store.jpg')",
      },
    },
  },
  plugins: [],
};
