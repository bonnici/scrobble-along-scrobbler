/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var NewKexpScraper = (function (_super) {
    __extends(NewKexpScraper, _super);
    function NewKexpScraper(name) {
        _super.call(this, name);
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