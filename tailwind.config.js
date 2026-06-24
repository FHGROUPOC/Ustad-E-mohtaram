/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add !important to everything so AliThemes/Bootstrap doesn't hide Tailwind
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // High chance your files are in here
    "./*.{js,ts,jsx,tsx,mdx}", // Scans files in the root too
  ],
  theme: {
    extend: {
      colors: {
        1: "#F3F4F6",
        2: "#FEF3C7",
        3: "#E0F2FE",
        4: "#DCFCE7",
        5: "#F3E8FF",
        6: "#FFE4E6",
        13: "#0e0e0f", // Often used for dark sections in this template
      },
      fontFamily: {
        // Urdu font ko variable ke sath map karein
        urdu: ["var(--font-noto-urdu)", "serif"],
      },
    },
  },
  safelist: ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6", "bg-13"],
  plugins: [],
};
