/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jsonScrap = require("./JsonScraper");
var ChronischScraper = (function (_super) {
    __extends(ChronischScraper, _super);
    function ChronischScraper(name) {
        _super.call(this, name);
    }
    ChronischScraper.prototype.getUrl = function (scraperParam) {
        return "http://api.laut.fm/station/chronisch_elektronisch/current_song";
    };
    /*
    preprocessBody(body: string):string {
        //simple regex to extract json body
        var matches = body.match(/{.*}/);
        return matches.length > 0 ? matches[0] : body;
    }
    */
    ChronischScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.artist.name.trim(),
            Track: jsonData.title.trim()
        };
    };
    return ChronischScraper;
})(jsonScrap.JsonScraper);
exports.ChronischScraper = ChronischScraper;
//# sourceMappingURL=ChronischScraper.js.map