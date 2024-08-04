module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "bg-login-start": "#FFE8E0",
        "bg-login-end": "#FFD7D5",
      },
      backgroundImage: {
        "bg-login-gradient": "linear-gradient(to right, #FFE8E0, #FFD7D5)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
