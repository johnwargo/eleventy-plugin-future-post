"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_logger_1 = __importDefault(require("cli-logger"));
const APP_NAME = 'Eleventy-Plugin-Future-Post';
module.exports = function (eleventyConfig, options = {}) {
    var isServing = false;
    var conf = { console: true, level: cli_logger_1.default.INFO };
    conf.prefix = function (record) {
        return `[${APP_NAME}]`;
    };
    var log = (0, cli_logger_1.default)(conf);
    const debugMode = options.debugMode || false;
    log.level(debugMode ? log.DEBUG : log.INFO);
    log.debug('Debug mode enabled');
    const currentDate = new Date();
    const timeOffsetInMS = currentDate.getTimezoneOffset() * 60000;
    log.debug(`Current Date: ${currentDate}, Offset: ${timeOffsetInMS}`);
    eleventyConfig.addGlobalData("eleventyComputed.permalink", () => {
        return (data) => {
            var msg = `Permalink`;
            if (data.title)
                msg += `: ${data.title}`;
            log.debug(msg);
            if (isServing)
                return data.permalink;
            return data.draft ? false : data.permalink;
        };
    });
    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            var msg = `Exclude: ${data.title}`;
            if (data.page.outputPath)
                msg += ` (${data.page.outputPath})`;
            log.debug(msg);
            if (isServing)
                return data.eleventyExcludeFromCollections;
            var pageDate = new Date(data.page.date);
            pageDate.setTime(pageDate.getTime() + timeOffsetInMS);
            log.debug(`Comparing page date: ${pageDate}`);
            return (pageDate > currentDate) ? true : data.eleventyExcludeFromCollections;
        };
    });
    eleventyConfig.on("eleventy.before", ({ runMode }) => {
        isServing = runMode === "serve" || runMode === "watch";
        if (isServing)
            log.debug('Serving full site (not excluding any posts)');
    });
};
