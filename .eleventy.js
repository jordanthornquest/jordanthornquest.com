module.exports = function (eleventyConfig) {
  // Copy static files to output
  eleventyConfig.addPassthroughCopy({ "static/": "/" });

  // Return configuration object
  return {
    dir: {
      data: "_data",
      includes: "_includes",
      input: "eleventy",
      layouts: "_layouts",
      output: "dist",
    },
  };
};
