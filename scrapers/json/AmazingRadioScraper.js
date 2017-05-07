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
var winston = require("winston");
var AmazingRadioScraper = (function (_super) {
    __extends(AmazingRadioScraper, _super);
    function AmazingRadioScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://www.amazingtunes.com/radio/history.json";
        return _this;
    }
    AmazingRadioScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };
    AmazingRadioScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artistName = jsonData[0].tune.artist.display_name;
        var title = jsonData[0].tune.title;
        if (!artistName || !title) {
            winston.info("AmazingRadioScraper could not find song");
            return { Artist: null, Track: null };
        }
        else {
            winston.info("AmazingRadioScraper found song " + artistName + " - " + title);
            return { Artist: artistName, Track: title };
        }
    };
    return AmazingRadioScraper;
}(scrap.JsonScraper));
exports.AmazingRadioScraper = AmazingRadioScraper;
//# sourceMappingURL=AmazingRadioScraper.js.map