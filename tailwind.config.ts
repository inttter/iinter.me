  module.exports = {
    content: [
      './src/components/**/*.{ts,tsx,js,jsx}', 
      './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
      extend: {
        colors: {
          'main': '#111110',
          'soft': '#D6D3D1',
          'soft-gray': '#373737'
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
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
    },
    variants: {},
    plugins: [
      require("daisyui"),
      require("tailwindcss-animate"),
    ],
    daisyui: {
      themes: ["light", "dark", "cupcake", "lofi", "coffee", "black"],
    },
  };