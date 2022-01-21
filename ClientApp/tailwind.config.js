module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./src/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  important: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  plugins: [],
  darkMode: 'class'
}
