const production = !process.env.ROLLUP_WATCH;
module.exports = {
  mode: "jit",                                              
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: "#080ccf",
        primary: "#b027b0",
        secondary: "#009688",
        error: "#f44336",
        success: "#4caf50",
        alert: "#ff9800",
        blue: "#2196f3",
        dark: "#212121",
        "white-trans": "rgba(255,255,255,0.2)",
        "white-transLight": "rgba(255,255,255,0.2)",
        "white-transDark": "rgba(255,255,255,0.2)",
        "black-trans": "rgba(0,0,0,0.2)",
        "black-transLight": "rgba(0,0,0,0.2)",
        "black-transLight": "rgba(0,0,0,0.2)",
        "black-transDark": "rgba(0,0,0,0.35)",
        gray: {
          trans: "rgba(250, 250, 250, 0.5)",
          transLight: "rgba(250, 250, 250, 0.1)",
          transDark: "rgba(100, 100, 100, 0.2)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: ["./**/*.html", "./**/*.svelte"],

    whitelistPatterns: [/svelte-/, /ripple/, /w\-.\/7/],
    whiteListPatternsChildren: [/svelte-/, /ripple/, /w\-.\/7/],
    whitelist: ["html", "body", "stroke-primary", "mode-dark"],

    defaultExtractor: (content) => [
      ...tailwindExtractor(content),
      // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
      ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
    ],
    keyframes: true,
  }
}
