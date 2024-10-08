module.exports = async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles.css");
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
