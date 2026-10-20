import type { Config } from "tailwindcss";

// Azafrán Pérsico brand tokens: saffron, deep red, warm earth and cream,
// with the menu's deep brown and gold from the printed carta.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "3rem" }, screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        cream: { DEFAULT: "#F6EFE3", soft: "#FBF7F0", deep: "#EDE2CF" },
        saffron: { DEFAULT: "#E1952B", deep: "#B8711A", light: "#F3C27A" },
        pomegranate: { DEFAULT: "#8E1B1E", deep: "#6E1316" },
        earth: { DEFAULT: "#6B4A36", deep: "#4A3226" },
        ink: { DEFAULT: "#372A28", soft: "#5E4D47" },
        gold: { DEFAULT: "#A67C3E", line: "#C9A46A" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        farsi: ["var(--font-farsi)", "Tahoma", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.4rem, 1rem + 7.4vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 1.4rem + 5vw, 6.5rem)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 1.2rem + 2.8vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: { soft: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1.08)" }, "100%": { transform: "scale(1)" } },
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
