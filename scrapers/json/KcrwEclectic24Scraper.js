/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var KcrwEclectic24Scraper = (function (_super) {
    __extends(KcrwEclectic24Scraper, _super);
    function KcrwEclectic24Scraper(name) {
        _super.call(this, name);
    }
    KcrwEclectic24Scraper.prototype.getUrl = function (lastfmUsername) {
        return "http://www.kcrw.com/json_song";
    };
    KcrwEclectic24Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return KcrwEclectic24Scraper;
}(jsonScrap.JsonScraper));
exports.KcrwEclectic24Scraper = KcrwEclectic24Scraper;
//# sourceMappingURL=KcrwEclectic24Scraper.js.map