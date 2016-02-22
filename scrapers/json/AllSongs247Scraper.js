/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./JsonScraper");
var AllSongs247Scraper = (function (_super) {
    __extends(AllSongs247Scraper, _super);
    function AllSongs247Scraper(name) {
        _super.call(this, name);
    }
    AllSongs247Scraper.prototype.getUrl = function (lastfmUsername) {
        return "http://www.npr.org/templates/music/data/GetLatestPlayingSong.php?streamId=129729686";
    };
    AllSongs247Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return AllSongs247Scraper;
})(scrap.JsonScraper);
exports.AllSongs247Scraper = AllSongs247Scraper;
//# sourceMappingURL=AllSongs247Scraper.js.map