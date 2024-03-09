module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}', 
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'gray-1100': '#B5B3AD',
        'blogcard': '#171721'
      },
    },
  },
  variants: {},
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "lofi", "coffee"],
  },
};