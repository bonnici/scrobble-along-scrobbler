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
var FipScraper = (function (_super) {
    __extends(FipScraper, _super);
    function FipScraper(name, url) {
        var _this = _super.call(this, name) || this;
        _this.url = url;
        return _this;
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
}(jsonScrap.JsonScraper));
exports.FipScraper = FipScraper;
//# sourceMappingURL=FipScraper.js.map