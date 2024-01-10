const futurePost = require('./eleventy-plugin-future-post.js');

module.exports = eleventyConfig => {

  // eleventyConfig.addPlugin(futurePost);
  // eleventyConfig.addPlugin(futurePost, { timeOffset: -5 });
  // eleventyConfig.addPlugin(futurePost, { debugMode: true });
  eleventyConfig.addPlugin(futurePost, { debugMode: true, timeOffset: -5 });

  eleventyConfig.addPassthroughCopy('src/assets/');
  eleventyConfig.addPassthroughCopy('files/');

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data'
    }
  }
};