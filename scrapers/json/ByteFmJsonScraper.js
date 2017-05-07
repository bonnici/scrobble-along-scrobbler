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
var htmlentities = require("html-entities");
var ByteFmJsonScraper = (function (_super) {
    __extends(ByteFmJsonScraper, _super);
    function ByteFmJsonScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.url = "https://www.byte.fm/ajax/song-history/";
        _this.entities = new htmlentities.XmlEntities();
        return _this;
    }
    ByteFmJsonScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };
    ByteFmJsonScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var track = jsonData.tracks[0];
        var re = /<a .*>(.*?)<\/a>/i;
        var found = track.match(re);
        var parsed = found && found.length > 1 ? found[1] : track;
        if (!parsed) {
            return { Artist: null, Track: null };
        }
        var decoded = this.entities.decode(parsed).replace("&ndash;", "-");
        var split = decoded.split("-");
        if (split && split.length > 1) {
            return { Artist: split[0].trim(), Track: split[1].trim() };
        }
        return { Artist: null, Track: null };
    };
    return ByteFmJsonScraper;
}(scrap.JsonScraper));
exports.ByteFmJsonScraper = ByteFmJsonScraper;
//# sourceMappingURL=ByteFmJsonScraper.js.map