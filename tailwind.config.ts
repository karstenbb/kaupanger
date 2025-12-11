import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "#F5A623",
          light: "#FFB84D",
          dark: "#D4891A",
        },
        // Background colors
        background: {
          DEFAULT: "#0A0E1A",
          card: "#131A2B",
          elevated: "#1A2235",
          glass: "rgba(19, 26, 43, 0.8)",
        },
        // Surface colors
        surface: {
          DEFAULT: "#1E2A3D",
          light: "#263448",
          border: "#2A3A52",
        },
        // Text colors
        "text-primary": "#FFFFFF",
        "text-secondary": "#8B95A5",
        "text-muted": "#5A6478",
        // Status colors
        status: {
          win: "#22C55E",
          draw: "#EAB308",
          loss: "#EF4444",
          injured: "#EF4444",
        },
        // Accent colors
        accent: {
          blue: "#3B82F6",
          cyan: "#06B6D4",
          purple: "#8B5CF6",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-card": "linear-gradient(135deg, #131A2B 0%, #1A2235 100%)",
        "gradient-primary": "linear-gradient(135deg, #F5A623 0%, #FFB84D 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(26, 34, 53, 0.9) 0%, rgba(19, 26, 43, 0.8) 100%)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "card": "0 4px 24px 0 rgba(0, 0, 0, 0.25)",
        "elevated": "0 8px 40px 0 rgba(0, 0, 0, 0.4)",
        "glow-primary": "0 0 20px rgba(245, 166, 35, 0.3)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
