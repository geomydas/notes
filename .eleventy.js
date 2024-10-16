const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier-terser");

module.exports = async function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    // If not an HTML output, return content as-is
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
