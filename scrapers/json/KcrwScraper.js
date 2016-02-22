/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./JsonScraper");
var KcrwScraper = (function (_super) {
    __extends(KcrwScraper, _super);
    function KcrwScraper(name) {
        _super.call(this, name);
    }
    KcrwScraper.prototype.getUrl = function (lastfmUsername) {
        return "http://tracklist-api.kcrw.com/Simulcast";
    };
    KcrwScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return KcrwScraper;
})(scrap.JsonScraper);
exports.KcrwScraper = KcrwScraper;
//# sourceMappingURL=KcrwScraper.js.map