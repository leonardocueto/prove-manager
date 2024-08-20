module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "bg-login-start": "#FFE8E0",
        "bg-login-end": "#FFD7D5",
        "bg-d-layout": "#ECEFEA",
        "primary-active": "#3E4685",
        primary: "#2482F7",
        secondary: "#FAFBFF",
        third: "#F5F8FC",
      },
      backgroundImage: {
        "bg-login-gradient": "linear-gradient(to right, #FFE8E0, #FFD7D5)",
        "bg-login-g": "linear-gradient(to right, #d2d5df, #F5F8FC)",
        "bg-default-login-gradient":
          "linear-gradient(to right, #fff, ##ECEFF0)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
