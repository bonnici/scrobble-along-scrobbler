"use strict";
/// <reference path="../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
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
var scrap = require("./Scraper");
var cheerio = require("cheerio");
var winston = require("winston");
var WzbcScraper = (function (_super) {
    __extends(WzbcScraper, _super);
    function WzbcScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://spinitron.com/public/index.php?station=wzbc";
        return _this;
    }
    WzbcScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        var headers = { 'User-Agent': "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1687.2 Safari/537.36" };
        this.fetchUrlWithHeaders(this.url, headers, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseHtml(body, callback);
        });
    };
    WzbcScraper.prototype.parseHtml = function (body, callback) {
        if (!body) {
            winston.warn("WzbcScraper: No HTML body");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var $ = cheerio.load(body);
        var playlistRows = $('div.f2row');
        if (playlistRows.length < 1) {
            winston.info("WzbcScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artist = playlistRows.first().find('span.aw').text();
        var song = playlistRows.first().find('span.sn').text();
        if (!artist || !song) {
            winston.info("WzbcScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }
        artist = artist.trim();
        song = song.trim().substring(1, song.length - 1).trim();
        if (!artist || !song) {
            winston.info("WzbcScraper could not find song");
            callback(null, { Artist: null, Track: null });
        }
        else {
            winston.info("WzbcScraper found song " + artist + " - " + song);
            callback(null, { Artist: artist, Track: song });
        }
    };
    return WzbcScraper;
}(scrap.Scraper));
exports.WzbcScraper = WzbcScraper;
//# sourceMappingURL=WzbcScraper.js.map