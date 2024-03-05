module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}', 
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      defaultFlavour: "mocha",
    }),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "lofi", "coffee"],
  },
};