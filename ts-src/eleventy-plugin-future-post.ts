module.exports = function (eleventyConfig: any, timeOffset = 0) {

    var currentTime = new Date();
    currentTime.setHours(0,0,0,0);
    console.log(`Compare Time: ${currentTime.toLocaleString()}`);

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data: any) => {
            var pageDate = new Date(data.page.date);

            console.log(`Title: ${data.title}, Page Date: ${pageDate.toLocaleString()}`);
            return (pageDate > currentTime) ? true : data.eleventyExcludeFromCollections;
        }
    });
}
