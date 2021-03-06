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
var scrap = require("./CheerioScraper");
var GensokyoRadioScraper = (function (_super) {
    __extends(GensokyoRadioScraper, _super);
    function GensokyoRadioScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.xmlMode = true;
        return _this;
    }
    GensokyoRadioScraper.prototype.getUrl = function (scraperParam) {
        return "https://gensokyoradio.net/xml/";
    };
    GensokyoRadioScraper.prototype.parseCheerio = function ($, callback) {
        var titleElem = $('GENSOKYORADIODATA SONGINFO TITLE');
        var artistElem = $('GENSOKYORADIODATA SONGINFO ARTIST');
        if (titleElem.length < 1 || artistElem.length < 1) {
            callback(null, { Artist: null, Track: null }, null);
            return;
        }
        var track = titleElem.eq(0).text().trim();
        var artist = artistElem.eq(0).text().trim();
        callback(null, { Artist: artist, Track: track }, null);
    };
    return GensokyoRadioScraper;
}(scrap.CheerioScraper));
exports.GensokyoRadioScraper = GensokyoRadioScraper;
//# sourceMappingURL=GensokyoRadioScraper.js.map