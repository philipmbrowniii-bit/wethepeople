import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f8f5ed",
        ink: "#151515",
        muted: "#66615a",
        rule: "#d7d0c2"
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
