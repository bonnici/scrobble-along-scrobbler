/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var moment = require('moment-timezone');
var util = require("util");
var winston = require("winston");

var KexpScraper = (function (_super) {
    __extends(KexpScraper, _super);
    function KexpScraper(name, baseUrl) {
        _super.call(this, name);
        this.defaultStartTime = null;
        this.baseUrl = baseUrl || "http://kexp.org/playlist/playlistupdates?channel=1&start=%s&since=%s";
    }
    // Separated so that it is mockable
    KexpScraper.prototype.startTime = function () {
        return this.defaultStartTime || moment().tz("America/Los_Angeles").subtract('minutes', 30).format("YYYY-MM-DDTHH:mm:ss.SSS");
    };

    KexpScraper.prototype.getUrl = function () {
        return util.format(this.baseUrl, this.startTime(), this.startTime());
    };

    KexpScraper.prototype.parseCheerio = function ($, callback) {
        var nowPlayingDiv = $.root().children('div').first();

        if (nowPlayingDiv.hasClass("AirBreak")) {
            winston.info("KexpScraper found an air break");
            callback(null, { Artist: null, Track: null });
            return;
        } else if (nowPlayingDiv.hasClass("Play")) {
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
})(scrap.CheerioScraper);
exports.KexpScraper = KexpScraper;

//# sourceMappingURL=KexpScraper.js.map
