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
var MediaStreamScraper = (function (_super) {
    __extends(MediaStreamScraper, _super);
    function MediaStreamScraper(name, id) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://nowplaying.mediastre.am/api/station/" + id + "/nowplaying";
        return _this;
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
}(jsonScrap.JsonScraper));
exports.MediaStreamScraper = MediaStreamScraper;
//# sourceMappingURL=MediaStreamScraper.js.map