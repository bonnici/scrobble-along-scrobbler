/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var jsonScrap = require("./JsonScraper");



var MediaStreamScraper = (function (_super) {
    __extends(MediaStreamScraper, _super);
    function MediaStreamScraper(name, id) {
        _super.call(this, name);
        this.url = "http://nowplaying.mediastre.am/api/station/" + id + "/nowplaying";
    }
    MediaStreamScraper.prototype.getUrl = function (scraperParam) {
        return this.url;
    };

    MediaStreamScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.data.artist.name,
            Track: jsonData.data.song.title
        };
    };
    return MediaStreamScraper;
})(jsonScrap.JsonScraper);
exports.MediaStreamScraper = MediaStreamScraper;

//# sourceMappingURL=MediaStreamScraper.js.map
