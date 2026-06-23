/**
 * Tailwind CSS configuration.
 *
 * Design tokens that extend the default palette are kept here so
 * they are available as utility classes (e.g. `bg-primary`, `text-accent`).
 * The CSS custom properties in globals.css mirror these values so both
 * inline styles and Tailwind classes stay consistent.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  /* Tell Tailwind which files to scan for class names so unused styles
     are removed in production builds. */
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#105b48",   // dark green — buttons, active states, avatar rings
        accent:  "#a8dc66",   // lime green — active nav underlines, selected dots
        surface: "#141414",   // card background
        "surface-2": "#1c1c1c", // slightly lighter card interior (property detail card)
      },
      fontFamily: {
        /* Plus Jakarta Sans is loaded via Google Fonts in globals.css */
        sans:    ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        /* Nunito used as fallback where a rounded look is preferred */
        rounded: ["Nunito", "system-ui", "sans-serif"],
      },
      borderColor: {
        /* 7 % white overlay used as the default subtle border colour */
        subtle: "rgba(255,255,255,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
