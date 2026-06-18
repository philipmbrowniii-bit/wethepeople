import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f4ec",
        ink: "#181816",
        muted: "#666159",
        rule: "#cbc4b6",
        gold: "#8a6a24",
        "gold-dark": "#684e16"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: [typography]
};

export default config;
