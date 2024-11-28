/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        BgPrimary: "#427CE1",
        BgPrimaryHover: "#2961C4",
        BgSecondary: "#F97316",
        TextPrimary: "#427CE1",
        TextPrimaryHover: "#2961C4",
        TextSecondary: "#F97316",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
