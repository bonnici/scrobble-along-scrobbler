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
var scrap = require("./JsonScraper");
var Kiis1065Scraper = (function (_super) {
    __extends(Kiis1065Scraper, _super);
    function Kiis1065Scraper(name) {
        var _this = _super.call(this, name) || this;
        _this.baseUrl = "http://www.kiis1065.com.au/umbraco/Arn/ArnFeed/GetOnAir?feedUrl=http://media.arn.com.au/xml/mix1065_now.xml";
        return _this;
    }
    Kiis1065Scraper.prototype.getUrl = function (lastfmUsername) {
        return this.baseUrl;
    };
    Kiis1065Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artist = jsonData.NowPlaying.Artist;
        if (artist !== "KIIS1065") {
            return { Artist: artist, Track: jsonData.NowPlaying.Title };
        }
        return { Artist: null, Track: null };
    };
    return Kiis1065Scraper;
}(scrap.JsonScraper));
exports.Kiis1065Scraper = Kiis1065Scraper;
//# sourceMappingURL=Kiis1065Scraper.js.map