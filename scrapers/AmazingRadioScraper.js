/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");


var _ = require("underscore");
var winston = require("winston");

var AmazingRadioScraper = (function (_super) {
    __extends(AmazingRadioScraper, _super);
    function AmazingRadioScraper(name) {
        _super.call(this, name);
        this.url = "http://www.amazingtunes.com/radio/history.json";
    }
    AmazingRadioScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };

    AmazingRadioScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artistName = jsonData[0].tune.artist.display_name;
        var title = jsonData[0].tune.title;

        if (!artistName || !title) {
            winston.info("AmazingRadioScraper could not find song");
            return { Artist: null, Track: null };
        } else {
            winston.info("AmazingRadioScraper found song " + artistName + " - " + title);
            return { Artist: artistName, Track: title };
        }
    };
    return AmazingRadioScraper;
})(scrap.JsonScraper);
exports.AmazingRadioScraper = AmazingRadioScraper;

//# sourceMappingURL=AmazingRadioScraper.js.map
