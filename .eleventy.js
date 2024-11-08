const browserslist = require("browserslist");
const cleancss = require("clean-css");
const htmlmin = require("html-minifier-terser");
// const purgecss = require("eleventy-plugin-purgecss");

module.exports = async function (eleventyConfig) {
  // Plugins

  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  // eleventyConfig.addPlugin(purgecss);

  // Global Data

  eleventyConfig.addGlobalData("subjectNames", [
    "Araling Panlipunan",
    "Arts",
    "Computer",
    "Edukasyon sa Pagpapakatao",
    "English",
    "Filipino",
    "Health",
    "Math",
    "Music",
    "Physical Education",
    "Science",
    "Technology and Livelihood Education",
  ]);

  // Htmlmin config

  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }
    return content;
  });

  // Cssmin config

  eleventyConfig.addFilter("cssmin", function (code) {
    return new cleancss({}).minify(code).styles;
  });

  // Other config

  eleventyConfig.addPassthroughCopy("./src/styles.css");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

module.exports.config = {
  pathPrefix: "/notes/",
};
