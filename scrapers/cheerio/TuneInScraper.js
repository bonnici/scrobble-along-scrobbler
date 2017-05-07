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
var scrap = require("./CheerioScraper");
var winston = require("winston");
var TuneInScraper = (function (_super) {
    __extends(TuneInScraper, _super);
    function TuneInScraper(name, radioId) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://tunein.com/radio/" + radioId + "/";
        return _this;
    }
    TuneInScraper.prototype.getUrl = function () {
        return this.url;
    };
    TuneInScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlaying = $('#nowPlayingInfo div.now-playing');
        var song = nowPlaying.next().text().trim();
        var splitSong = song.split(" - ");
        if (splitSong.length < 2) {
            winston.warn("TuneInScraper: Could not split song " + song);
            callback(null, { Artist: null, Track: null });
        }
        else {
            callback(null, { Artist: splitSong[1].trim(), Track: splitSong[0].trim() });
        }
    };
    return TuneInScraper;
}(scrap.CheerioScraper));
exports.TuneInScraper = TuneInScraper;
//# sourceMappingURL=TuneInScraper.js.map