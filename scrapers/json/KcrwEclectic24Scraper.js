"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var jsonScrap = require("./JsonScraper");
var KcrwEclectic24Scraper = (function (_super) {
    __extends(KcrwEclectic24Scraper, _super);
    function KcrwEclectic24Scraper(name) {
        return _super.call(this, name) || this;
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