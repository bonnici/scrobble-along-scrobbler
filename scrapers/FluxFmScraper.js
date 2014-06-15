/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var jsonScrap = require("./JsonScraper");



var FluxFmScraper = (function (_super) {
    __extends(FluxFmScraper, _super);
    function FluxFmScraper(name) {
        _super.call(this, name);
    }
    FluxFmScraper.prototype.getUrl = function (scraperParam) {
        return "http://www.fluxfm.de/fluxfm-playlist/api.php?act=list&cuttime=1&limit=1&loc=berlin";
    };

    FluxFmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.tracks[0].artist.trim(),
            Track: jsonData.tracks[0].title.trim()
        };
    };
    return FluxFmScraper;
})(jsonScrap.JsonScraper);
exports.FluxFmScraper = FluxFmScraper;

//# sourceMappingURL=FluxFmScraper.js.map
