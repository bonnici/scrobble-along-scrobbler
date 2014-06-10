/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./Scraper");


var winston = require("winston");

var HollowEarthScraper = (function (_super) {
    __extends(HollowEarthScraper, _super);
    function HollowEarthScraper(name) {
        _super.call(this, name);
        this.url = "http://www.boontdusties.com/specialhollow/yql.php";
    }
    HollowEarthScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        var timestampedUrl = this.url + "?_=" + new Date().getTime();
        this.fetchUrl(timestampedUrl, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseHtml(body, callback);
        });
    };

    HollowEarthScraper.prototype.parseHtml = function (body, callback) {
        body = body.replace("\\", "");
        var split = body.split("<br/>");

        if (split.length <= 1) {
            winston.info("HollowEarthScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var currentSong = split[1];
        var currentSongSplit = currentSong.split(" - ");

        if (currentSongSplit.length >= 2) {
            winston.info("HollowEarthScraper found song " + currentSongSplit[0] + " - " + currentSongSplit[1]);
            callback(null, { Artist: currentSongSplit[0], Track: currentSongSplit[1] });
            return;
        }
        winston.info("HollowEarthScraper could not find song");
        callback(null, { Artist: null, Track: null });
    };
    return HollowEarthScraper;
})(scrap.Scraper);
exports.HollowEarthScraper = HollowEarthScraper;

//# sourceMappingURL=HollowEarthScraper.js.map
