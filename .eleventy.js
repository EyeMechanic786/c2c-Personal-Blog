module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}; 