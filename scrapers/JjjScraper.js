/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var winston = require("winston");

var JjjScraper = (function (_super) {
    __extends(JjjScraper, _super);
    function JjjScraper(name, baseUrl) {
        _super.call(this, name);
        this.baseUrl = baseUrl || "http://www.abc.net.au/triplej/feeds/playout/triplej_sydney_playout.xml";
    }
    JjjScraper.prototype.getUrl = function () {
        return this.baseUrl;
    };

    JjjScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlayingItem = $.root().find('item').first();
        var playingTime = nowPlayingItem.find('playing');

        if (playingTime.length > 0 && playingTime.first().text().toLowerCase() == "now") {
            var artists = nowPlayingItem.find('artistname');
            var tracks = nowPlayingItem.find('title');

            if (artists.length > 0 && tracks.length > 0) {
                var artist = artists.first().text();
                var track = tracks.first().text();

                if (artist && track) {
                    winston.info("JjjScraper found song " + artist + " - " + track);
                    callback(null, { Artist: artist, Track: track });
                    return;
                }
            }
        }

        winston.info("JjjScraper could not find song");
        callback(null, { Artist: null, Track: null });
    };
    return JjjScraper;
})(scrap.CheerioScraper);
exports.JjjScraper = JjjScraper;

//# sourceMappingURL=JjjScraper.js.map
