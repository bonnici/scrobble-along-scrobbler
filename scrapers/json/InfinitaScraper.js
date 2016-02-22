/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var winston = require("winston");
var InfinitaScraper = (function (_super) {
    __extends(InfinitaScraper, _super);
    function InfinitaScraper(name) {
        _super.call(this, name);
    }
    InfinitaScraper.prototype.getUrl = function (scraperParam) {
        return "http://vivo.infinita.cl/json/last.json?_=" + new Date().getTime();
    };
    InfinitaScraper.prototype.preprocessBody = function (body) {
        //trim jsonp from start "last(" and end ")"
        return body.substring(5, body.length - 1);
    };
    InfinitaScraper.prototype.extractNowPlayingSong = function (jsonData) {
        if (!jsonData || !jsonData.items || jsonData.items.length == 0 || !jsonData.items[0].song) {
            winston.error("InfinitaScraper found invalid json ", jsonData);
            return { Artist: null, Track: null };
        }
        var firstTrack = jsonData.items[0].song;
        var splitDetails = firstTrack.split("|");
        if (splitDetails.length < 2) {
            winston.error("InfinitaScraper found invalid track details ", firstTrack);
            return { Artist: null, Track: null };
        }
        else {
            return {
                Artist: splitDetails[0].trim(),
                Track: splitDetails[1].trim()
            };
        }
    };
    return InfinitaScraper;
})(jsonScrap.JsonScraper);
exports.InfinitaScraper = InfinitaScraper;
//# sourceMappingURL=InfinitaScraper.js.map