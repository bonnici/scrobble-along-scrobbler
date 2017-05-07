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
var FluxFmScraper = (function (_super) {
    __extends(FluxFmScraper, _super);
    function FluxFmScraper(name) {
        return _super.call(this, name) || this;
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
}(jsonScrap.JsonScraper));
exports.FluxFmScraper = FluxFmScraper;
//# sourceMappingURL=FluxFmScraper.js.map