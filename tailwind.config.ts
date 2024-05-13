  module.exports = {
    content: [
      './src/components/**/*.{ts,tsx,js,jsx}', 
      './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
      extend: {
        colors: {
          'gray-1100': '#B5B3AD',
          'blogcard': '#171721',
          'main': '#111111'
        },
        animation: {
          "blurred-fade-in": "blurred-fade-in 0.9s ease-in-out"
        },
        keyframes: {
          "blurred-fade-in": {
            "0%": {
              "filter": "blur(5px)",
              "opacity": "0"
            },
            "100%": {
              "filter": "blur(0)",
              "opacity": "1"
            }
          }
        }
      },
    },
    variants: {},
    plugins: [
      require("daisyui"),
      require("tailwindcss-animate"),
      require('tailwind-scrollbar')
    ],
    daisyui: {
      themes: ["light", "dark", "cupcake", "lofi", "coffee", "black"],
    },
  };