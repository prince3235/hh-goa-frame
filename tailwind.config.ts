import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jungle: {
          DEFAULT: "#0F4C33",
          deep: "#0A3A27",
          light: "#166B45"
        },
        marigold: {
          DEFAULT: "#F6C90E",
          deep: "#E0AE00"
        },
        hibiscus: {
          DEFAULT: "#E8177D",
          deep: "#C2115F"
        },
        sand: "#FBF6E9",
        clay: "#F4EBD0",
        ink: "#0B2118"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      backgroundImage: {
        "dot-border":
          "repeating-linear-gradient(90deg, #E8177D 0 6px, transparent 6px 14px)"
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(10,58,39,0.45)",
        glow: "0 0 0 3px rgba(246,201,14,0.35)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
