"use strict";
module.exports = function (eleventyConfig, options = {}) {
    const timeOffset = (options.timeOffset || 0) * 3600000;
    console.log(`Time Offset: ${timeOffset}`);
    const folders = options.folders || [];
    var currentTime = new Date();
    console.log(`Compare Time: ${currentTime.toLocaleString()}`);
    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            var pageDate = new Date(data.page.date);
            var adjustedDate = new Date(pageDate.getTime() - timeOffset);
            console.log(`\nTitle: ${data.title}`);
            console.log(`Page Date: ${pageDate}, Adjusted Date: ${adjustedDate}`);
            return (pageDate > currentTime) ? true : data.eleventyExcludeFromCollections;
        };
    });
};
