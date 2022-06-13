module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "blue": {
        DEFAULT: "#11BDE2",
        "dark": "#0CA1C1",
      },
      "red": {
        DEFAULT: "#FF473B",
        "dark": "#D93429",
      },
      "orange": {
        DEFAULT: "#FF7F48",
      },
      "green": {
        DEFAULT: "#4ED443",
      },
      "white": "#FFFFFF",
      "black": "#000000",
    },
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif']
      },
    },
  },
  plugins: [],
}