/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");


var winston = require("winston");

var TheEndScraper = (function (_super) {
    __extends(TheEndScraper, _super);
    function TheEndScraper(name) {
        _super.call(this, name);
    }
    TheEndScraper.prototype.getUrl = function () {
        var baseUrl = "http://kndd.tunegenie.com/w2/pluginhour/since/kndd/";
        var sinceTime = new Date().getTime() - (60 * 60 * 1000);
        var timestampedUrl = baseUrl + sinceTime + "/?x=" + new Date().getTime();
        return timestampedUrl;
    };

    TheEndScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var lastTrack = jsonData.length - 1;

        if (!jsonData[lastTrack].artistName || !jsonData[lastTrack].trackName) {
            winston.warn("TheEndScraper: Invalid last track", {
                trackName: jsonData[lastTrack].trackName,
                artistName: jsonData[lastTrack].artistName
            });
            return { Artist: null, Track: null };
        }

        winston.info("TheEndScraper found song " + jsonData[lastTrack].artistName + " - " + jsonData[lastTrack].trackName);
        return { Artist: jsonData[lastTrack].artistName, Track: jsonData[lastTrack].trackName };
    };
    return TheEndScraper;
})(scrap.JsonScraper);
exports.TheEndScraper = TheEndScraper;

//# sourceMappingURL=TheEndScraper.js.map
