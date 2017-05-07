/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var jsonScrap = require("./JsonScraper");
var KGSRScraper = (function (_super) {
    __extends(KGSRScraper, _super);
    function KGSRScraper(name) {
        return _super.call(this, name) || this;
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