# Eleventy Plugin Future Post

An Eleventy Plugin that allows you to set a future publishing date for one or more posts and not generate (publish) them until you build the site after the selected date.

The [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) project has a drafts feather that allows you to work on a post within an Eleventy project without publishing it. You essentially assign a **draft** state to the post and Eleventy doesn't publish it during the build process until you remove the draft state.

For my use case, I wanted something different, I didn't want to manage the **state** of the document, I wanted the document to publish based on metadata in the post (the post date property). The Joomla CMS has this feature, you simply set the publish date and time in the post and it miraculously appears at the selected date and time. WordPress allows you to do both, set a published state and a date to publish it.

To accomplish this, I created this plugin; you can read more about it in [Hiding Future Posts in Eleventy](https://johnwargo.com/posts/2024/hiding-future-posts-eleventy).





Filters all pages, home page and the like. 
As long as the page doesn't have a Date frontmatter property, the plugin will ignore.


## Installation

```shell
npm install eleventy-plugin-future-post
```


## Usage


```js
const futurePost = require('eleventy-plugin-future-post');
```


```js
module.exports = eleventyConfig => {

  // other stuff

  eleventyConfig.addPlugin(futurePost);  

  // other stuff
  
};
```





*** 

If this code helps you, please consider buying me a coffee.

<a href="https://www.buymeacoffee.com/johnwargo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
