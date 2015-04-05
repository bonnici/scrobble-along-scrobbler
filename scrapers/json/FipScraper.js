/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jsonScrap = require("./JsonScraper");
var FipScraper = (function (_super) {
    __extends(FipScraper, _super);
    function FipScraper(name, url) {
        _super.call(this, name);
        this.url = url;
    }
    FipScraper.prototype.getUrl = function (scraperParam) {
        return this.url + new Date().getTime();
    };
    FipScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: this.capitalize(jsonData.current.song.interpreteMorceau),
            Track: this.capitalize(jsonData.current.song.titre)
        };
    };
    return FipScraper;
})(jsonScrap.JsonScraper);
exports.FipScraper = FipScraper;
//# sourceMappingURL=FipScraper.js.map