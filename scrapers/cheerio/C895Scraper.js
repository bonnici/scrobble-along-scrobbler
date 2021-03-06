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
var C895Scraper = (function (_super) {
    __extends(C895Scraper, _super);
    function C895Scraper(name) {
        return _super.call(this, name) || this;
    }
    C895Scraper.prototype.getUrl = function () {
        return "http://www.c895.org/playlist/";
    };
    C895Scraper.prototype.parseCheerio = function ($, callback) {
        var playlistRows = $('table#playlist tr');
        if (playlistRows.length < 1) {
            winston.warn("C895Scraper: Not enough playlist rows (" + playlistRows.length + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var firstSongRow = playlistRows.eq(1);
        if (firstSongRow.children("td").length < 3) {
            winston.warn("C895Scraper: Not enough playlist cols (" + firstSongRow.children("td").length + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artist = firstSongRow.children("td").eq(1).text();
        var song = firstSongRow.children("td").eq(2).text();
        if (firstSongRow.children("td").length >= 3) {
            var mix = firstSongRow.children("td").eq(3).text();
            if (mix) {
                song += " (" + mix + ")";
            }
        }
        if (!artist || artist == '' || !song || song == '') {
            winston.warn("C895Scraper: Invalid cols (" + artist + "/" + song + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }
        winston.info("C895Scraper found song " + artist + " - " + song);
        callback(null, { Artist: artist, Track: song });
    };
    return C895Scraper;
}(scrap.CheerioScraper));
exports.C895Scraper = C895Scraper;
//# sourceMappingURL=C895Scraper.js.map