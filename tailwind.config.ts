import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 10px 40px rgba(31,41,55,0.08)",
        soft: "0 8px 24px rgba(15,23,42,0.08)",
        lift: "0 16px 44px rgba(15,23,42,0.12)"
      },
      backgroundImage: {
        shell:
          "radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(239,246,255,0.78) 30%, rgba(232,244,255,0.76) 55%, rgba(250,250,252,1) 100%)",
        panel:
          "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.56))"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
