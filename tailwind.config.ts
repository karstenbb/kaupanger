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
        // Primary brand colors - Gul frå logoen
        primary: {
          DEFAULT: "#E8C547",
          light: "#F0D76A",
          dark: "#C9A93A",
        },
        // Secondary - Blå frå logoen
        secondary: {
          DEFAULT: "#2B5A8A",
          light: "#3A7AB8",
          dark: "#1E4268",
        },
        // Accent - Grøn frå logoen (elgen)
        accent: {
          DEFAULT: "#2D8B5A",
          light: "#3AAF72",
          dark: "#1F6B44",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          purple: "#8B5CF6",
        },
        // Background colors - Mørkare blå tonar
        background: {
          DEFAULT: "#0A1628",
          card: "rgba(20, 40, 70, 0.6)",
          elevated: "rgba(30, 55, 95, 0.5)",
          glass: "rgba(15, 30, 55, 0.7)",
        },
        // Surface colors
        surface: {
          DEFAULT: "rgba(40, 70, 110, 0.4)",
          light: "rgba(50, 85, 130, 0.5)",
          border: "rgba(100, 140, 190, 0.2)",
        },
        // Text colors
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0B4CC",
        "text-muted": "#6B8AAD",
        // Status colors
        status: {
          win: "#2D8B5A",
          draw: "#E8C547",
          loss: "#DC4B4B",
          injured: "#DC4B4B",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-card": "linear-gradient(135deg, rgba(20, 40, 70, 0.8) 0%, rgba(30, 55, 95, 0.6) 100%)",
        "gradient-primary": "linear-gradient(135deg, #E8C547 0%, #F0D76A 100%)",
        "gradient-secondary": "linear-gradient(135deg, #2B5A8A 0%, #3A7AB8 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(30, 55, 95, 0.7) 0%, rgba(20, 40, 70, 0.5) 100%)",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(43, 90, 138, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(232, 197, 71, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(45, 139, 90, 0.2) 0px, transparent 50%)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "glass-lg": "0 16px 48px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "card": "0 4px 24px 0 rgba(0, 0, 0, 0.3)",
        "elevated": "0 8px 40px 0 rgba(0, 0, 0, 0.5)",
        "glow-primary": "0 0 30px rgba(232, 197, 71, 0.3)",
        "glow-secondary": "0 0 30px rgba(43, 90, 138, 0.4)",
        "glow-accent": "0 0 30px rgba(45, 139, 90, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(232, 197, 71, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
