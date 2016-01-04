/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");
var CprScraper = (function (_super) {
    __extends(CprScraper, _super);
    function CprScraper(name, urlName) {
        _super.call(this, name);
        this.baseUrl = "http://playlist.cprnetwork.org/api/" + urlName;
    }
    CprScraper.prototype.getUrl = function (lastfmUsername) {
        return this.baseUrl + "?n=" + new Date().getTime();
    };
    CprScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData[0].artist,
            Track: jsonData[0].title
        };
    };
    return CprScraper;
})(scrap.JsonScraper);
exports.CprScraper = CprScraper;
//# sourceMappingURL=CprScraper.js.map