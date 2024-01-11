# Eleventy Plugin Future Post

An Eleventy Plugin that allows you to set a future publishing date for one or more posts and not generate (publish) them until you build the site after the selected date.

The [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) project has a drafts feather that allows you to work on a post within an Eleventy project without publishing it. You essentially assign a **draft** state to the post and Eleventy doesn't publish it during the build process until you remove the draft state.

For my use case, I wanted something different, I didn't want to manage the **state** of the document, I wanted the document to publish based on metadata in the post (the post date property). The Joomla CMS has this feature, you simply set the publish date and time in the post and it miraculously appears at the selected date and time. WordPress allows you to do both, set a published state and a date to publish it.

To accomplish this, I created this plugin; you can read more about it in [Hiding Future Posts in Eleventy](https://johnwargo.com/posts/2024/hiding-future-posts-eleventy).

## Processing Scope

The plugin processes all the files in an Eleventy site (Home, About, etc.); I could have added code to ignore them, but as long as those pages don't have a `date` front matter property since none of those pages should have a future save date, the plugin will automatically publish them (they won't be ignored during the Eleventy site build process).

## Installation

To install the plugin, open a terminal window or command prompt to an Eleventy project and execute the following command:

```shell
npm install eleventy-plugin-future-post
```

At the top of the project's `eleventy.config.js` file, add the following line:

```js
const futurePost = require('eleventy-plugin-future-post');
```

Inside the `module.exports` section of the file, load the plugin as shown in the following example:

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
