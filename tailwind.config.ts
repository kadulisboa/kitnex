import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  extend: {
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0", transform: "translate(-50%, 10px)" },
        "100%": { opacity: "1", transform: "translate(-50%, 0)" },
      },
      "scale-up": {
        "0%": { transform: "scale(0.95) translate(-50%, -50%)", opacity: "0" },
        "100%": { transform: "scale(1) translate(-50%, -50%)", opacity: "1" },
      },
    },
    animation: {
      fadeIn: "fadeIn 0.2s ease-out",
      "scale-up": "scale-up 0.2s ease-out",
    },
  },
  plugins: [],
} satisfies Config;
