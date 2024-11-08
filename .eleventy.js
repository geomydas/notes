const htmlmin = require("html-minifier-terser");

module.exports = async function (eleventyConfig) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

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

  // Other config

  eleventyConfig.addPassthroughCopy("styles.css");

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
