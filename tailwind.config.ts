import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#080a0d",
          900: "#0b0d10",
          850: "#0f1217",
          800: "#12161c",
          750: "#161b22",
          700: "#1c212a",
          600: "#262d3a",
          500: "#363f52",
          400: "#505c75",
          300: "#7b879d",
          200: "#9ba6b9",
          100: "#cbd5e1",
          50: "#f1f5f9",
        },
        terminal: {
          emerald: "#10b981",
          amber: "#f59e0b",
          cyan: "#06b6d4",
          rose: "#f43f5e",
          blue: "#3b82f6",
          purple: "#a855f7",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(16, 185, 129, 0.2)",
        "glow-amber": "0 0 20px -5px rgba(245, 158, 11, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
