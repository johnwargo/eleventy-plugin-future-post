"use strict";

module.exports = function (eleventyConfig) {

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            // get the post date
            var pageDate = new Date(data.page.date);
            // if the post date is in the future, exclude it from collections
            if (pageDate > new Date()) {
                return true;
            }
            // otherwise, return what's already set for the post
            return data.eleventyExcludeFromCollections;
        }
    });
}

