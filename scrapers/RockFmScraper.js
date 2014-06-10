/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var winston = require("winston");

var RockFmScraper = (function (_super) {
    __extends(RockFmScraper, _super);
    function RockFmScraper(name) {
        _super.call(this, name);
        this.url = "http://www.rockfm.co.uk";
    }
    RockFmScraper.prototype.getUrl = function () {
        return this.url;
    };

    RockFmScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlayingSpans = $('#now-playing-track span');

        if (nowPlayingSpans.length < 3) {
            winston.warn("RockFmScraper: Not enough now playing spans (" + nowPlayingSpans.length + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artist = nowPlayingSpans.eq(1).text();
        var song = nowPlayingSpans.eq(2).text();

        if (!artist || !song) {
            winston.warn("RockFmScraper: Invalid artist or song (" + artist + "/" + song + ")");
            callback(null, { Artist: null, Track: null });
        } else {
            callback(null, { Artist: artist, Track: song });
        }
    };
    return RockFmScraper;
})(scrap.CheerioScraper);
exports.RockFmScraper = RockFmScraper;

//# sourceMappingURL=RockFmScraper.js.map
