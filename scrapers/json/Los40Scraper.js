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
var Los40Scraper = (function (_super) {
    __extends(Los40Scraper, _super);
    function Los40Scraper(name) {
        return _super.call(this, name) || this;
    }
    Los40Scraper.prototype.getUrl = function () {
        return "https://play.los40.com/api/v1/hasonado/get/los40?host=play.los40.com";
    };
    Los40Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData[0].artist, Track: jsonData[0].song };
    };
    return Los40Scraper;
}(jsonScrap.JsonScraper));
exports.Los40Scraper = Los40Scraper;
//# sourceMappingURL=Los40Scraper.js.map