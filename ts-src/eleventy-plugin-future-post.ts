/***********************************************
 * Eleventy Plugin Future Post
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

type ModuleOptions = {
    // debugMode?: boolean,
    timeOffset?: number,
    folders?: string[]
}

module.exports = function (eleventyConfig: any, options: ModuleOptions = {}) {

    // Get our options, defaulting as needed
    // const debugMode = options.debugMode || false;
    const timeOffset = (options.timeOffset || 0) * 3600000;
    console.log(`Time Offset: ${timeOffset}`);
    const folders = options.folders || [];

    var currentTime: Date = new Date();
    console.log(`Compare Time: ${currentTime.toLocaleString()}`);

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data: any) => {
            var pageDate = new Date(data.page.date);                        
            var adjustedDate = new Date(pageDate.getTime() - timeOffset);            
            console.log(`\nTitle: ${data.title}`);
            console.log(`Page Date: ${pageDate}, Adjusted Date: ${adjustedDate}`);
            return (pageDate > currentTime) ? true : data.eleventyExcludeFromCollections;
        }
    });
}
