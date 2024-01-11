"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_logger_1 = __importDefault(require("cli-logger"));
const APP_NAME = 'Eleventy-Plugin-Future-Post';
module.exports = function (eleventyConfig, options = {}) {
    var conf = { console: true, level: cli_logger_1.default.INFO };
    conf.prefix = function (record) {
        return `[${APP_NAME}]`;
    };
    var log = (0, cli_logger_1.default)(conf);
    const debugMode = options.debugMode || false;
    log.level(debugMode ? log.DEBUG : log.INFO);
    log.debug('Debug mode enabled');
    const folders = options.folders || [];
    if (folders.length > 0)
        log.info(`Folders: ${folders.join(', ')}`);
    const currentDate = new Date();
    const timeOffsetInMS = currentDate.getTimezoneOffset() * 60000;
    log.debug(`Current Date: ${currentDate}, Offset: ${timeOffsetInMS}`);
    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            var pageDate = new Date(data.page.date);
            pageDate.setTime(pageDate.getTime() + timeOffsetInMS);
            log.debug(`${data.title}: Date: ${pageDate}`);
            return (pageDate > currentDate) ? true : data.eleventyExcludeFromCollections;
        };
    });
};
