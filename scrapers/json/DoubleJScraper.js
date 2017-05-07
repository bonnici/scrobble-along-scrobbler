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
var DoubleJScraper = (function (_super) {
    __extends(DoubleJScraper, _super);
    function DoubleJScraper(name, url) {
        var _this = _super.call(this, name) || this;
        _this.url = url || "http://music.abcradio.net.au/api/v1/plays/doublej/now.json";
        return _this;
    }
    DoubleJScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };
    DoubleJScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artistName = jsonData.now.recording.artists[0].name;
        var title = jsonData.now.recording.title;
        if (!artistName || !title) {
            winston.warn("DoubleJScraper could not find song");
            return { Artist: null, Track: null };
        }
        else {
            winston.info("DoubleJScraper found song " + artistName + " - " + title);
            return { Artist: artistName, Track: title };
        }
    };
    return DoubleJScraper;
}(scrap.JsonScraper));
exports.DoubleJScraper = DoubleJScraper;
//# sourceMappingURL=DoubleJScraper.js.map