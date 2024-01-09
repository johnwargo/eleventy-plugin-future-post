/***********************************************
 * Eleventy Plugin Future Post
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

//@ts-ignore
import logger from 'cli-logger';

type ModuleOptions = {
    debugMode?: boolean,
    timeOffset?: number,
    folders?: string[]
}

const APP_NAME = 'Eleventy-Plugin-Future-Post';

module.exports = function (eleventyConfig: any, options: ModuleOptions = {}) {

    // configure the logger
    var conf: any = { console: true, level: logger.INFO };
    conf.prefix = function (record: any) {
        return `[${APP_NAME}]`;
    }
    var log = logger(conf);

    // Get our options, defaulting as needed
    const debugMode = options.debugMode || false;
    log.level(debugMode ? log.DEBUG : log.INFO);
    log.debug('Debug mode enabled');
    
    const folders = options.folders || [];
    if (folders.length > 0) log.info(`Folders: ${folders.join(', ')}`);
    const timeOffset = (options.timeOffset || 0) * 3600000;
    log.debug(`Time Offset: ${timeOffset}`);

    // get the current date/time
    var tmpDate = new Date();
    // convert it to UTC because Eleventy Post dates are in UTC
    var currentDate: Date = new Date(tmpDate + 'z');
    log.debug(`Current Date: ${currentDate}`);

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data: any) => {
            var pageDate = new Date(data.page.date);
            var adjustedDate = new Date(pageDate.getTime() - timeOffset);
            log.debug(data.title);
            log.debug(`Page Date: ${pageDate}, Adjusted Date: ${adjustedDate}`);
            return (pageDate > currentDate) ? true : data.eleventyExcludeFromCollections;
        }
    });
}
