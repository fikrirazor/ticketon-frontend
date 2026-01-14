/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Generic theme colors (placeholders, can be customized)
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b", // slate-500
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#020817", // slate-950
      },
    },
  },
  plugins: [],
};
