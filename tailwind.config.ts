import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#050B14",     // Tumhara deep navy/black background
        cardBg: "#0A1220",     // Cards ke liye thora sa light bg
        cyanPrimary: "#00E5FF",// Glowing bright cyan (neon blue)
        cyanDark: "#0088AA",   // Gradient bananey ke liye dark cyan
      },
      backgroundImage: {
        'gradient-cyan': 'linear-gradient(90deg, #0088AA 0%, #00E5FF 100%)',
      }
    },
  },
  plugins: [],
};
export default config;