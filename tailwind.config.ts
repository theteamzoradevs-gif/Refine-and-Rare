import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Text / dark surfaces — Charcoal with deep-green undertone
        ink: {
          DEFAULT: "#1C2421",
          2: "#24302C",
        },
        // Secondary — Warm Ivory / Off-White
        cream: {
          DEFAULT: "#F5F0E6",
          2: "#E8DFD0",
        },
        // Primary — Deep Forest Green
        teal: {
          DEFAULT: "#1B3A2F",
          dark: "#122820",
          light: "#2A5344",
        },
        // Accent — Muted Champagne Gold
        gold: {
          DEFAULT: "#C5B28A",
          dark: "#A89468",
          light: "#D4C6A3",
        },
        muted: "#5C6560",
        line: "#DDD5C8",
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
          "linear-gradient(105deg, rgba(28,36,33,0.82) 0%, rgba(27,58,47,0.55) 55%, rgba(28,36,33,0.28) 100%)",
        "section-fade":
          "linear-gradient(180deg, #F5F0E6 0%, #E8DFD0 100%)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(27, 58, 47, 0.5)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 0 14px rgba(27, 58, 47, 0)",
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
        timelineMarquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeRise: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
        "float-in": "floatIn 0.8s ease-out forwards",
        "ken-burns": "kenBurns 18s ease-out forwards",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
        "float-soft": "floatSoft 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee 32s linear infinite reverse",
        "timeline-marquee": "timelineMarquee 40s linear infinite",
        "fade-rise": "fadeRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
