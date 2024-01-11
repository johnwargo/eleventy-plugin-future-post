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
    debugMode?: boolean,
    // timeOffset?: number,
    // folders?: string[]
}

const APP_NAME = 'Eleventy-Plugin-Future-Post';

module.exports = function (eleventyConfig: any, options: ModuleOptions = {}) {

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

    // const folders = options.folders || [];
    // if (folders.length > 0) log.info(`Folders: ${folders.join(', ')}`);

    // get the current date/time (once at the beginning of the build)
    const currentDate: Date = new Date();
    const timeOffsetInMS: number = currentDate.getTimezoneOffset() * 60000;
    log.debug(`Current Date: ${currentDate}, Offset: ${timeOffsetInMS}`);

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data: any) => {
            var pageDate = new Date(data.page.date);
            pageDate.setTime(pageDate.getTime() + timeOffsetInMS);
            log.debug(`${data.title}: Date: ${pageDate}`);
            return (pageDate > currentDate) ? true : data.eleventyExcludeFromCollections;
        }
    });
}
