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
var Radio2NLScraper = (function (_super) {
    __extends(Radio2NLScraper, _super);
    function Radio2NLScraper(name) {
        return _super.call(this, name) || this;
    }
    Radio2NLScraper.prototype.getUrl = function (scraperParam) {
        return "http://radiobox2.omroep.nl/data/radiobox2/nowonair/2.json?npo_cc_skip_wall=1";
    };
    Radio2NLScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.results[0].songfile.artist.trim(),
            Track: jsonData.results[0].songfile.title.trim()
        };
    };
    return Radio2NLScraper;
}(jsonScrap.JsonScraper));
exports.Radio2NLScraper = Radio2NLScraper;
//# sourceMappingURL=Radio2NLScraper.js.map