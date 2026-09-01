import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-spectral)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#F4F3EB",
        warm: "#E3E2D5",
        carbon: "#323232",
        deep: "#066AA7",
        light: "#7D9BC6",
        sage: "#A3A391",
        olive: "#64653F",
      },
    },
  },
  plugins: [],
}

export default config
