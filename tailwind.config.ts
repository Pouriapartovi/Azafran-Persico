import type { Config } from "tailwindcss";

// Azafrán Pérsico palette: clean white, pomegranate red and pistachio green.
// brand = buttons and accents; brand-deep = red text on white; leaf = fresh green for labels and details.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "3rem" }, screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        paper: { DEFAULT: "#FFFFFF" },
        mist: { DEFAULT: "#F3F8F2", deep: "#E9EEE7" },
        brand: { DEFAULT: "#E5243F", deep: "#BF1830", light: "#FF9AA6", tint: "#FFECEE" },
        leaf: { DEFAULT: "#2F9E4F", deep: "#1D7A3A", tint: "#E2F4E6" },
        ink: { DEFAULT: "#15171C", soft: "#575C66" },
        line: { DEFAULT: "#E2E6E0" },
        night: { DEFAULT: "#14161B", soft: "#262A31" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        farsi: ["var(--font-farsi)", "Tahoma", "sans-serif"],
      },
      fontSize: {
        // Hero headline beside the carousel (the hero sets a column-based size from lg up).
        hero: ["clamp(2.3rem, 1rem + 5vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.4rem, 1rem + 7.4vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 1.4rem + 5vw, 6.5rem)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 1.2rem + 2.8vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: { soft: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1.04)" }, "100%": { transform: "scale(1)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        kenburns: "kenburns 9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
