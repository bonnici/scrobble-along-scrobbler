/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");

var winston = require("winston");

var TuneInScraper = (function (_super) {
    __extends(TuneInScraper, _super);
    function TuneInScraper(name, radioId) {
        _super.call(this, name);
        this.url = "http://tunein.com/radio/" + radioId + "/";
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
        } else {
            callback(null, { Artist: splitSong[1].trim(), Track: splitSong[0].trim() });
        }
    };
    return TuneInScraper;
})(scrap.CheerioScraper);
exports.TuneInScraper = TuneInScraper;
//# sourceMappingURL=TuneInScraper.js.map
