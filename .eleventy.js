const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier-terser");

module.exports = async function (eleventyConfig) {

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

  eleventyConfig.addPassthroughCopy("./src/styles.css");

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
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
