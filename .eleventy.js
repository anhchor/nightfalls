module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('svg');
  eleventyConfig.addPassthroughCopy('fonts');

  return {
    passthroughFileCopy: true
  }  
}