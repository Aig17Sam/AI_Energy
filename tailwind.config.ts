import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10202b",
        "energy-green": "#10b981",
        "sun-gold": "#f5b942",
        "mist-blue": "#e9f5f5"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 32, 43, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
