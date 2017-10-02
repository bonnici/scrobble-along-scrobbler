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
var Wave965Scraper = (function (_super) {
    __extends(Wave965Scraper, _super);
    function Wave965Scraper(name) {
        return _super.call(this, name) || this;
    }
    Wave965Scraper.prototype.getUrl = function (scraperParam) {
        return "http://np.radioplayer.co.uk/qp/v3/onair?rpIds=501&nameSize=200&artistNameSize=200&descriptionSize=200&_="
            + new Date().getTime();
    };
    Wave965Scraper.prototype.preprocessBody = function (body) {
        // Strip "callback(" from start and ")" from end
        return body.substring(9, body.length - 1);
    };
    Wave965Scraper.prototype.extractNowPlayingSong = function (jsonData) {
        for (var i = 0; i < jsonData.results["501"].length; i++) {
            if (jsonData.results["501"][i].type == "PE_E") {
                return {
                    Artist: jsonData.results["501"][i].artistName,
                    Track: jsonData.results["501"][i].name
                };
            }
        }
        return { Artist: null, Track: null };
    };
    return Wave965Scraper;
}(jsonScrap.JsonScraper));
exports.Wave965Scraper = Wave965Scraper;
//# sourceMappingURL=Wave965Scraper.js.map