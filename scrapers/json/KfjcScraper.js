/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");
var KfjcScraper = (function (_super) {
    __extends(KfjcScraper, _super);
    function KfjcScraper(name) {
        _super.call(this, name);
    }
    KfjcScraper.prototype.getUrl = function (lastfmUsername) {
        return "http://kfjc.org/api/playlists/current.php?_=" + new Date().getTime();
    };
    KfjcScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.track_title };
    };
    return KfjcScraper;
})(scrap.JsonScraper);
exports.KfjcScraper = KfjcScraper;
//# sourceMappingURL=KfjcScraper.js.map