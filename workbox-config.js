module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{html,json,ico,png,js,css,txt}"],
  swDest: "build/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
