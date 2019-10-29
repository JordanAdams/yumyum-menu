"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var luxon_1 = require("luxon");
var gmail_1 = require("./gmail");
var cheerio_1 = __importDefault(require("cheerio"));
var config_1 = __importDefault(require("./config"));
var LOGO_URL = "https://gallery.mailchimp.com/960535dd9067bb938d37f961b/images/36ca8e6b-70cc-4ab5-82ca-952c29e8b00c.png";
exports.fetchLatestMenuEmail = function () {
    var today = luxon_1.DateTime.local().toFormat("yyyy/MM/dd");
    var filters = [
        "from:cafe.yumyum@outlook.com",
        config_1["default"].features.dateFilter ? "after:" + today : ""
    ];
    return gmail_1.findEmail(filters.join(""));
};
exports.extractMenuImageUrl = function (html) {
    var dom = cheerio_1["default"].load(html);
    var images = dom("img").toArray();
    var urls = images.map(function (image) { return image.attribs.src; });
    var matchingUrls = urls
        .filter(function (url) { return url.match("gallery.mailchimp.com"); })
        .filter(function (url) { return !url.match(LOGO_URL); });
    return matchingUrls[0] || null;
};
//# sourceMappingURL=yumyum.js.map