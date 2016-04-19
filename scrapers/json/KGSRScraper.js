/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var KGSRScraper = (function (_super) {
    __extends(KGSRScraper, _super);
    function KGSRScraper(name) {
        _super.call(this, name);
    }
    KGSRScraper.prototype.getUrl = function (lastfmUsername) {
        return "http://api-partner.tagstation.com/nowplaying/SKK3SLOJR4CC";
    };
    KGSRScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.Artist, Track: jsonData.SongName };
    };
    return KGSRScraper;
}(jsonScrap.JsonScraper));
exports.KGSRScraper = KGSRScraper;
//# sourceMappingURL=KGSRScraper.js.map