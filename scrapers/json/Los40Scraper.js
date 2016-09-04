/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var Los40Scraper = (function (_super) {
    __extends(Los40Scraper, _super);
    function Los40Scraper(name) {
        _super.call(this, name);
    }
    Los40Scraper.prototype.getUrl = function () {
        return "http://www.yes.fm/a/radio/fm/hasonado/LOS40";
    };
    Los40Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.result[0].artist, Track: jsonData.result[0].track };
    };
    return Los40Scraper;
}(jsonScrap.JsonScraper));
exports.Los40Scraper = Los40Scraper;
//# sourceMappingURL=Los40Scraper.js.map