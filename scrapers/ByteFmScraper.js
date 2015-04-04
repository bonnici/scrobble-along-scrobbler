/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var winston = require("winston");
var ByteFmScraper = (function (_super) {
    __extends(ByteFmScraper, _super);
    function ByteFmScraper(name) {
        _super.call(this, name);
    }
    ByteFmScraper.prototype.getUrl = function () {
        return "http://byte.fm/php/content/home/new.php?q=undefined&sid=" + Math.random();
    };
    ByteFmScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlayingDiv = $('div#aktuell p a');
        if (nowPlayingDiv.length < 1) {
            winston.warn("ByteFmScraper: Could not find now playing div");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var song = nowPlayingDiv.text().trim();
        var songParts = song.split(" - ");
        if (songParts.length < 2) {
            winston.warn("ByteFmScraper: Could not split song name " + song);
            callback(null, { Artist: null, Track: null });
            return;
        }
        callback(null, { Artist: songParts[0].trim(), Track: songParts[1].trim() });
    };
    return ByteFmScraper;
})(scrap.CheerioScraper);
exports.ByteFmScraper = ByteFmScraper;
//# sourceMappingURL=ByteFmScraper.js.map