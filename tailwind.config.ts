import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101416",
          2: "#1a2021",
        },
        cream: {
          DEFAULT: "#f7f1e7",
          2: "#ead8b9",
        },
        teal: {
          DEFAULT: "#517871",
          dark: "#3d5c56",
          light: "#6a948c",
        },
        gold: {
          DEFAULT: "#c9a66b",
          dark: "#a8864f",
          light: "#dbbf8f",
        },
        muted: "#6b6560",
        line: "#d9d2c5",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1180px",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(105deg, rgba(16,20,22,0.78) 0%, rgba(16,20,22,0.45) 55%, rgba(16,20,22,0.25) 100%)",
        "section-fade":
          "linear-gradient(180deg, #f7f1e7 0%, #ead8b9 100%)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(81, 120, 113, 0.55)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 0 14px rgba(81, 120, 113, 0)",
            transform: "scale(1.04)",
          },
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        scrollLine: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "40%": { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(1)", opacity: "0" },
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
        "float-in": "floatIn 0.8s ease-out forwards",
        "ken-burns": "kenBurns 18s ease-out forwards",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
        "float-soft": "floatSoft 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
