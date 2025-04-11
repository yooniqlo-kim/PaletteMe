/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      colors: {
        primary: "#ff385c",
        "primary-hover": "#e0284a",
        "primary-inactive": "#bfbfbf",
        "navbar-active": "#d33753",
        secondary: "#f2a0f4",
        "secondary-hover": "#e58ce5",
        third: "#fdf7eb",
        inactive: "#c2c2c2",
        "neutral-1": "#f7f7f7",
        "neutral-2": "#ebebeb",
        "neutral-3": "#dddddd",
        "neutral-4": "#d3d3d3",
        "neutral-5": "#c2c2c2",
        "neutral-6": "#b0b0b0",
        "neutral-7": "#717171",
        "neutral-8": "#5e5e5e",
      },
    },
    plugins: [],
  };
  