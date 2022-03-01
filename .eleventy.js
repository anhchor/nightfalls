
module.exports = function(eleventyConfig) {

  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('svg');
  eleventyConfig.addPassthroughCopy('fonts');

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addFilter("randomItem", (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });

  return {
    passthroughFileCopy: true
  }  
}