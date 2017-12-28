"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
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
var WWOZScraper = (function (_super) {
    __extends(WWOZScraper, _super);
    function WWOZScraper(name) {
        return _super.call(this, name) || this;
    }
    WWOZScraper.prototype.getUrl = function (lastfmUsername) {
        return "https://www.wwoz.org/api/tracks/current";
    };
    WWOZScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.ArtistName, Track: jsonData.SongName };
    };
    return WWOZScraper;
}(scrap.JsonScraper));
exports.WWOZScraper = WWOZScraper;
//# sourceMappingURL=WWOZScraper.js.map