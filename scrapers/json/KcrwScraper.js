"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
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
var scrap = require("./JsonScraper");
var KcrwScraper = (function (_super) {
    __extends(KcrwScraper, _super);
    function KcrwScraper(name) {
        return _super.call(this, name) || this;
    }
    KcrwScraper.prototype.getUrl = function (lastfmUsername) {
        return "http://tracklist-api.kcrw.com/Simulcast";
    };
    KcrwScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return KcrwScraper;
}(scrap.JsonScraper));
exports.KcrwScraper = KcrwScraper;
//# sourceMappingURL=KcrwScraper.js.map