"use strict";
/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
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
var TheCurrentScraper = (function (_super) {
    __extends(TheCurrentScraper, _super);
    function TheCurrentScraper(name) {
        return _super.call(this, name) || this;
    }
    TheCurrentScraper.prototype.getUrl = function () {
        return "http://www.thecurrent.org/playlist";
    };
    TheCurrentScraper.prototype.parseCheerio = function ($, callback) {
        var playlistRows = $('li#playlist li div.songDetails');
        if (playlistRows.length < 1) {
            winston.info("TheCurrentScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artist = playlistRows.first().find('h5.artist').text();
        var song = playlistRows.first().find('h5.title').text();
        if (!artist || !song) {
            winston.info("TheCurrentScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }
        artist = artist.trim();
        song = song.trim();
        if (!artist || !song) {
            winston.info("TheCurrentScraper could not find song");
            callback(null, { Artist: null, Track: null });
        }
        else {
            winston.info("TheCurrentScraper found song " + artist + " - " + song);
            callback(null, { Artist: artist, Track: song });
        }
    };
    return TheCurrentScraper;
}(scrap.CheerioScraper));
exports.TheCurrentScraper = TheCurrentScraper;
//# sourceMappingURL=TheCurrentScraper.js.map