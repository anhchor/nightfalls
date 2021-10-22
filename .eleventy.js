
module.exports = function(eleventyConfig) {

  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

  // this works because Eleventy also installs markdown-it 
  const markdownIt = require("markdown-it");
      
  // create a new markdown-it instance with the plugin
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownLib = markdownIt({ html: true }).use(markdownItAnchor);

  // replace the default markdown-it instance
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('svg');
  eleventyConfig.addPassthroughCopy('fonts');

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    passthroughFileCopy: true
  }  
}