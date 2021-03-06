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
var _ = require("underscore");
var winston = require("winston");
var DigMusicScraper = (function (_super) {
    __extends(DigMusicScraper, _super);
    function DigMusicScraper(name, baseUrl) {
        var _this = _super.call(this, name) || this;
        _this.url = baseUrl || "http://digmusic.net.au/player-data.php";
        return _this;
    }
    DigMusicScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };
    DigMusicScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artistName = null;
        var title = null;
        _.each(jsonData, function (element) {
            if (element && element.playing == 'now') {
                artistName = element.artistName;
                title = element.title;
            }
        });
        if (!artistName || !title) {
            winston.info("DigMusicScraper could not find song");
            return { Artist: null, Track: null };
        }
        else {
            winston.info("DigMusicScraper found song " + artistName + " - " + title);
            return { Artist: artistName, Track: title };
        }
    };
    return DigMusicScraper;
}(scrap.JsonScraper));
exports.DigMusicScraper = DigMusicScraper;
//# sourceMappingURL=DigMusicScraper.js.map