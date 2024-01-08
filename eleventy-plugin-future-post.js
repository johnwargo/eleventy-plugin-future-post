"use strict";

module.exports = function (eleventyConfig) {

    var currentTime = new Date();

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            var pageDate = new Date(data.page.date);
            return (pageDate > currentTime) ? true : data.eleventyExcludeFromCollections;
        }
    });
}

// if the post date is in the future, exclude it from collections
// if (pageDate > new Date()) {
//     return true;
// }
// // otherwise, return what's already set for the post
// return data.eleventyExcludeFromCollections;
