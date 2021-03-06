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
var VodafoneFmScraper = (function (_super) {
    __extends(VodafoneFmScraper, _super);
    function VodafoneFmScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://www.vodafone.fm/rewind";
        return _this;
    }
    VodafoneFmScraper.prototype.getUrl = function () {
        return this.url;
    };
    VodafoneFmScraper.prototype.parseCheerio = function ($, callback) {
        var items = $('#rewind_list #radio_log_item');
        var song = items.eq(0);
        if (song && song.attr('artist') && song.attr('title')) {
            callback(null, { Artist: song.attr('artist').trim(), Track: song.attr('title').trim() });
        }
        callback(null, null, { Artist: null, Track: null });
        /*
        var nowPlaying = $('#nowPlayingInfo div.now-playing');
        var song = nowPlaying.next().text().trim();
        var splitSong = song.split(" - ");

        if (splitSong.length < 2) {
            winston.warn("TuneInScraper: Could not split song " + song);
            callback(null, { Artist: null, Track: null });
        } else {
            callback(null, { Artist: splitSong[1].trim(), Track: splitSong[0].trim() });
        }
        */
    };
    return VodafoneFmScraper;
}(scrap.CheerioScraper));
exports.VodafoneFmScraper = VodafoneFmScraper;
//# sourceMappingURL=VodafoneFmScraper.js.map