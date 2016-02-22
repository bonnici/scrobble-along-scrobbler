/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./JsonScraper");
var PlayFmScraper = (function (_super) {
    __extends(PlayFmScraper, _super);
    function PlayFmScraper(name) {
        _super.call(this, name);
    }
    PlayFmScraper.prototype.getUrl = function (lastfmUsername) {
        //return "http://nowplaying.playfm.cl/api/station/4f47e1a2ee909d6c7b0001db/nowplaying";
        return "http://playfm-int.janus.cl/app_janus/site/canciones/last.json?_=" + new Date().getTime();
    };
    PlayFmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        //return { Artist: jsonData.data.artist.name, Track: jsonData.data.song.title };
        return { Artist: this.capitalize(jsonData[0].artistName), Track: this.capitalize(jsonData[0].titleName) };
    };
    return PlayFmScraper;
})(scrap.JsonScraper);
exports.PlayFmScraper = PlayFmScraper;
//# sourceMappingURL=PlayFmScraper.js.map