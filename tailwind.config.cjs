/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: "7.5vw 65vw 20vw 7.5vw",
      },
      gridTemplateRows: {
        custom: "15vh 70vh 15vh 75vh",
      },
      fontFamily: {
        archivo: ["Archivo Black", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        oswald: ["Oswald", "sans-serif"]
      },
      boxShadow: {
        custom: "4px 6px 0px 3px #000000",
      },
    },
  },
  plugins: [],
}

