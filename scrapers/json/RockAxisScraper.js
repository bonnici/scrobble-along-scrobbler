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
var scrap = require("./JsonScraper");
var RockAxisScraper = (function (_super) {
    __extends(RockAxisScraper, _super);
    function RockAxisScraper(name) {
        return _super.call(this, name) || this;
    }
    RockAxisScraper.prototype.getUrl = function () {
        return "http://nowplaying.s-mdstrm.com/cache/nowplaying_4fd129734ec855d42100129c.json";
    };
    RockAxisScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data.artist.name, Track: jsonData.data.song.title };
    };
    return RockAxisScraper;
}(scrap.JsonScraper));
exports.RockAxisScraper = RockAxisScraper;
//# sourceMappingURL=RockAxisScraper.js.map