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
var cheerio = require("cheerio");
var RadioNovaScraper = (function (_super) {
    __extends(RadioNovaScraper, _super);
    function RadioNovaScraper(name) {
        return _super.call(this, name) || this;
    }
    RadioNovaScraper.prototype.getUrl = function (scraperParam) {
        return "http://www.novaplanet.com/radionova/ontheair";
    };
    RadioNovaScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var trackMarkup = jsonData.track.markup;
        var $ = cheerio.load(trackMarkup);
        var artist = $('div.artist').text().trim();
        var track = $('div.title').text().trim();
        return {
            Artist: artist,
            Track: track
        };
    };
    return RadioNovaScraper;
}(jsonScrap.JsonScraper));
exports.RadioNovaScraper = RadioNovaScraper;
//# sourceMappingURL=RadioNovaScraper.js.map