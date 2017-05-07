/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
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
var AllSongs247Scraper = (function (_super) {
    __extends(AllSongs247Scraper, _super);
    function AllSongs247Scraper(name) {
        return _super.call(this, name) || this;
    }
    AllSongs247Scraper.prototype.getUrl = function (lastfmUsername) {
        return "http://www.npr.org/templates/music/data/GetLatestPlayingSong.php?streamId=129729686";
    };
    AllSongs247Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return AllSongs247Scraper;
}(scrap.JsonScraper));
exports.AllSongs247Scraper = AllSongs247Scraper;
//# sourceMappingURL=AllSongs247Scraper.js.map