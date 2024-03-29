/***********************************************
 * Eleventy Plugin Future Post
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/
// https://stackoverflow.com/questions/7403486/add-or-subtract-timezone-difference-to-javascript-date

//@ts-ignore
import logger from 'cli-logger';

type ModuleOptions = {
    debugMode?: boolean
}

const APP_NAME = 'Eleventy-Plugin-Future-Post';

module.exports = function (eleventyConfig: any, options: ModuleOptions = {}) {

    var isServing: boolean = false;

    // configure logger output (sets [plugin] name as prefix)
    var conf: any = { console: true, level: logger.INFO };
    conf.prefix = function (record: any) {
        return `[${APP_NAME}]`;
    }
    var log = logger(conf);

    // Get our options, defaulting as needed
    const debugMode = options.debugMode || false;
    log.level(debugMode ? log.DEBUG : log.INFO);
    log.debug('Debug mode enabled');

    // get the current date/time (once at the beginning of the build)
    const currentDate: Date = new Date();
    const timeOffsetInMS: number = currentDate.getTimezoneOffset() * 60000;
    log.debug(`Current Date: ${currentDate}, Offset: ${timeOffsetInMS}`);

    eleventyConfig.addGlobalData("eleventyComputed.permalink", () => {
        // When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
        // `addGlobalData` acts like a global data file and runs the top level function it receives.
        return (data: any) => {
            var msg = `Permalink`;
            if (data.title) msg += `: ${data.title}`;
            log.debug(msg);
            if (isServing) return data.permalink;
            // Always skip during non-watch/serve builds
            return data.draft ? false : data.permalink;
        }
    });

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data: any) => {
            var msg = `Exclude: ${data.title}`;
            if (data.page.outputPath) msg += ` (${data.page.outputPath})`;
            log.debug(msg);
            // If we're serving the site, don't exclude anything
            if (isServing) return data.eleventyExcludeFromCollections;
            // when not serving, check the date
            var pageDate = new Date(data.page.date);
            pageDate.setTime(pageDate.getTime() + timeOffsetInMS);
            log.debug(`Comparing page date: ${pageDate}`);
            return (pageDate > currentDate) ? true : data.eleventyExcludeFromCollections;
        }
    });

    eleventyConfig.on("eleventy.before", ({ runMode }: { runMode: string }) => {
        // initialize the `isServing` flag once before the build starts
        isServing = runMode === "serve" || runMode === "watch";
        if (isServing) log.debug('Serving full site (not excluding any posts)');
    });
}
