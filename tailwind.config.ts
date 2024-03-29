import type { Config } from "tailwindcss";
import TypeSystemPlugin from "./TypeSystemPlugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        blur: `rgba(255,255,255,.05)`,
      },
      fontFamily: {
        sans: ["var(--font-nb-international)", "ui-sans-serif", "system-ui"],
        mono: [
          "var(--font-nb-international-mono)",
          "ui-monospace",
          "SFMono-Regular",
        ],
      },
    },
  },
  plugins: [
    //
    // USAGE:
    //
    // the syntax of the type system is uses a "font" prefix
    // to indicate a reference to a type style.
    //
    // Example Syntax: font-[sans/mono]-[size]
    //
    // eg: font-mono-xs, font-sans-lg, font-sans-sm
    //
    // size could be xs, sm, md, lg, xl, 2xl, 3xl, 4xl
    //
    // TODO: add tablet responsive sizing definition

    TypeSystemPlugin({
      // default base stlying (mobile)
      default: {
        // mono
        "mono-xs": {
          "font-family": "var(--font-nb-international-mono)",
          "font-size": ".75rem",
          "letter-spacing": "-0.03rem",
          "line-height": "85%",
          "text-transform": "uppercase",
        },
        "mono-sm": {
          "font-family": "var(--font-nb-international-mono)",
          "font-size": ".875rem",
          "letter-spacing": "-0.035rem",
          "line-height": "85%",
          "text-transform": "uppercase",
        },
        // sans
        "sans-xs": {
          "font-size": ".75rem",
          "letter-spacing": "0rem",
          "line-height": "150%",
        },
        "sans-sm": {
          "font-size": ".875rem",
          "letter-spacing": "0rem",
          "line-height": "150%",
        },
        "sans-md": {
          "font-size": "1rem",
          "letter-spacing": "0rem",
          "line-height": "150%",
        },
        "sans-lg": {
          "font-size": "1rem",
          "letter-spacing": "0rem",
          "line-height": "150%",
        },
        "sans-xl": {
          "font-size": "1.25rem",
          "letter-spacing": "-0.025rem",
          "line-height": "-0.025rem",
        },
        "sans-2xl": {
          "font-size": "1.25rem",
          "letter-spacing": "-0.0125rem",
          "line-height": "1.25em",
        },
        "sans-3xl": {
          "font-size": "2rem",
          "letter-spacing": "-0.03em",
          "line-height": "1.25em",
        },
        "sans-4xl": {
          "font-size": "2rem",
          "letter-spacing": "-0.03em",
          "line-height": "1.25em",
        },
      },

      // When screen is at lg breakpoint (desktop)
      lg: {
        // mono
        "mono-xs": {
          "letter-spacing": "-0.03rem",
        },
        "mono-sm": {
          "letter-spacing": "-0.035rem",
        },
        "sans-xs": {
          "font-size": ".75rem",
          "letter-spacing": "0rem",
          "line-height": "110%",
        },
        "sans-sm": {
          "font-size": "1rem",
          "letter-spacing": "-0.02em",
          "line-height": "110%",
        },
        "sans-md": {
          "font-size": "1.125rem",
          "letter-spacing": "-0.01125rem",
          "line-height": "110%",
        },
        "sans-lg": {
          "font-size": "1.25rem",
          "letter-spacing": "-0.025rem",
          "line-height": "-0.025rem",
        },
        "sans-xl": {
          "font-size": "1.5rem",
          "letter-spacing": "-0.015rem",
          "line-height": "2rem",
        },
        "sans-2xl": {
          "font-size": "4rem",
          "letter-spacing": "-0.12rem",
          "line-height": "90%",
        },
        "sans-3xl": {
          "font-size": "5.125rem",
          "letter-spacing": "-0.1025rem",
          "line-height": "90%",
        },
        "sans-4xl": {
          "font-size": "6rem",
          "letter-spacing": "85%",
          "line-height": "103%",
        },
      },
    }),
  ],
};
export default config;
