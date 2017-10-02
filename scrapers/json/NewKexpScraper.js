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
var jsonScrap = require("./JsonScraper");
var NewKexpScraper = (function (_super) {
    __extends(NewKexpScraper, _super);
    function NewKexpScraper(name) {
        return _super.call(this, name) || this;
    }
    NewKexpScraper.prototype.getUrl = function (scraperParam) {
        return "http://legacy-api.kexp.org/play/?limit=1";
    };
    NewKexpScraper.prototype.extractNowPlayingSong = function (jsonData) {
        if (jsonData.results[0].playtype.playtypeid != 1) {
            return {
                Artist: null,
                Track: null
            };
        }
        else {
            return {
                Artist: jsonData.results[0].artist.name,
                Track: jsonData.results[0].track.name
            };
        }
    };
    return NewKexpScraper;
}(jsonScrap.JsonScraper));
exports.NewKexpScraper = NewKexpScraper;
//# sourceMappingURL=NewKexpScraper.js.map