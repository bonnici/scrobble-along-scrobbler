/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
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
var Go963Scraper = (function (_super) {
    __extends(Go963Scraper, _super);
    function Go963Scraper(name) {
        return _super.call(this, name) || this;
    }
    Go963Scraper.prototype.getUrl = function (scraperParam) {
        return "http://core.commotion.com/B7F19079-E958-48ED-8C90-E879D3D0B314/nowplaying/songs?since=now&count=1&_="
            + new Date().getTime();
    };
    Go963Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.songs[0].songartist,
            Track: jsonData.songs[0].songtitle
        };
    };
    return Go963Scraper;
}(jsonScrap.JsonScraper));
exports.Go963Scraper = Go963Scraper;
//# sourceMappingURL=Go963Scraper.js.map