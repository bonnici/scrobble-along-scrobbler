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
var winston = require("winston");
var Wave965HtmlScraper = (function (_super) {
    __extends(Wave965HtmlScraper, _super);
    function Wave965HtmlScraper(name, channel) {
        return _super.call(this, name) || this;
    }
    Wave965HtmlScraper.prototype.getUrl = function () {
        return "http://www.wave965.com/music/playlist/";
    };
    Wave965HtmlScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlaying = $('div #nowPlaying');
        // Can't use this - it takes too long to get (~5 seconds)
        winston.info(nowPlaying.eq(0).text());
        callback(null, { Artist: null, Track: null });
    };
    return Wave965HtmlScraper;
}(scrap.CheerioScraper));
exports.Wave965HtmlScraper = Wave965HtmlScraper;
//# sourceMappingURL=Wave965HtmlScraper.js.map