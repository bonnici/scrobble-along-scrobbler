"use strict";
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
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
var moment = require("moment-timezone");
var util = require("util");
var winston = require("winston");
var KexpScraper = (function (_super) {
    __extends(KexpScraper, _super);
    function KexpScraper(name, baseUrl) {
        var _this = _super.call(this, name) || this;
        _this.defaultStartTime = null; // Overridable for tests
        _this.baseUrl = baseUrl || "http://kexp.org/playlist/playlistupdates?channel=1&start=%s&since=%s";
        return _this;
    }
    // Separated so that it is mockable
    KexpScraper.prototype.startTime = function () {
        return this.defaultStartTime ||
            moment().tz("America/Los_Angeles").subtract(30, 'minutes').format("YYYY-MM-DDTHH:mm:ss.SSS");
    };
    KexpScraper.prototype.getUrl = function () {
        return util.format(this.baseUrl, this.startTime(), this.startTime());
    };
    KexpScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlayingDiv = $.root().children('div').first();
        // Check for airbreak
        if (nowPlayingDiv.hasClass("AirBreak")) {
            winston.info("KexpScraper found an air break");
            callback(null, { Artist: null, Track: null });
            return;
        }
        else if (nowPlayingDiv.hasClass("Play")) {
            var artist = nowPlayingDiv.find("div.ArtistName").text();
            var track = nowPlayingDiv.find("div.TrackName").text();
            if (artist && track) {
                winston.info("KexpScraper found song " + artist + " - " + track);
                callback(null, { Artist: artist, Track: track });
                return;
            }
        }
        winston.info("KexpScraper could not find a song");
        callback(null, { Artist: null, Track: null });
    };
    return KexpScraper;
}(scrap.CheerioScraper));
exports.KexpScraper = KexpScraper;
//# sourceMappingURL=KexpScraper.js.map