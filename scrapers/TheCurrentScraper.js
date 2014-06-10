/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");



var winston = require("winston");

var TheCurrentScraper = (function (_super) {
    __extends(TheCurrentScraper, _super);
    function TheCurrentScraper(name) {
        _super.call(this, name);
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
        } else {
            winston.info("TheCurrentScraper found song " + artist + " - " + song);
            callback(null, { Artist: artist, Track: song });
        }
    };
    return TheCurrentScraper;
})(scrap.CheerioScraper);
exports.TheCurrentScraper = TheCurrentScraper;

//# sourceMappingURL=TheCurrentScraper.js.map
