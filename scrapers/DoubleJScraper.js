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

var DoubleJScraper = (function (_super) {
    __extends(DoubleJScraper, _super);
    function DoubleJScraper(name) {
        _super.call(this, name);
        this.url = "http://program.abcradio.net.au/api/v1/now_next_previous/doublej.json";
    }
    DoubleJScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };

    DoubleJScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artistName = jsonData.now.published_entity.artists[0].name;
        var title = jsonData.now.published_entity.title;

        if (!artistName || !title) {
            winston.info("DoubleJScraper could not find song");
            return { Artist: null, Track: null };
        } else {
            winston.info("DoubleJScraper found song " + artistName + " - " + title);
            return { Artist: artistName, Track: title };
        }
    };
    return DoubleJScraper;
})(scrap.JsonScraper);
exports.DoubleJScraper = DoubleJScraper;

//# sourceMappingURL=DoubleJScraper.js.map
