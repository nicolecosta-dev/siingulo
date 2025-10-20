/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { blue: "#0C2047", orange: "#FF6A2A" },
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.08)" },
    },
  },
  plugins: [],
};
