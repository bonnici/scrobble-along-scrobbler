/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var winston = require("winston");
var moment = require("moment-timezone");
var CbcRadio3Scraper = (function (_super) {
    __extends(CbcRadio3Scraper, _super);
    function CbcRadio3Scraper(name) {
        _super.call(this, name);
    }
    CbcRadio3Scraper.prototype.getUrl = function () {
        var now = moment().tz("America/New_York");
        return "http://music.cbc.ca/radio3broadcastlogs/radio3broadcastlogs.aspx?broadcastdate=" + now.format("YYYY-MM-DD");
    };
    CbcRadio3Scraper.prototype.parseCheerio = function ($, callback) {
        var lastEntry = $('div.logEntryInfo').last();
        if (!lastEntry) {
            winston.warn("CbcRadio3Scraper: Could not find last entry");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var splitInfo = lastEntry.text().trim().split("\n");
        if (splitInfo.length != 2) {
            winston.warn("CbcRadio3Scraper: Invalid entry info", splitInfo);
            callback(null, { Artist: null, Track: null });
        }
        else {
            callback(null, { Artist: splitInfo[0].trim(), Track: splitInfo[1].trim() });
        }
    };
    return CbcRadio3Scraper;
})(scrap.CheerioScraper);
exports.CbcRadio3Scraper = CbcRadio3Scraper;
//# sourceMappingURL=CbcRadio3Scraper.js.map