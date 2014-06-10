/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var winston = require("winston");

var KcrwScraper = (function (_super) {
    __extends(KcrwScraper, _super);
    function KcrwScraper(name) {
        _super.call(this, name);
    }
    KcrwScraper.prototype.getUrl = function () {
        return "http://newmedia.kcrw.com/tracklists/index.php?channel=Live";
    };

    KcrwScraper.prototype.parseCheerio = function ($, callback) {
        var playlistRows = $("table#table_tracklist tbody tr");

        if (playlistRows.length < 1) {
            winston.warn("KcrwScraper: Not enough playlist rows (" + playlistRows.length + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var firstSongRow = playlistRows.eq(0);

        if (firstSongRow.children("td").length < 3) {
            winston.warn("KcrwScraper: Not enough playlist cols (" + firstSongRow.children("td").length + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artist = firstSongRow.children("td").eq(1).text();
        var song = firstSongRow.children("td").eq(2).text();

        if (!artist || artist == '' || !song || song == '' || artist == 'Break' || song == "Break") {
            winston.warn("KcrwScraper: Invalid cols (" + artist + "/" + song + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }

        winston.info("KcrwScraper found song " + artist + " - " + song);
        callback(null, { Artist: artist, Track: song });
    };
    return KcrwScraper;
})(scrap.CheerioScraper);
exports.KcrwScraper = KcrwScraper;

//# sourceMappingURL=KcrwScraper.js.map
