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
var SixFortyScraper = (function (_super) {
    __extends(SixFortyScraper, _super);
    function SixFortyScraper(name) {
        return _super.call(this, name) || this;
    }
    SixFortyScraper.prototype.getUrl = function (scraperParam) {
        return "http://54.173.171.80:8000/json.xsl?callback=parseMusic&_="
            + new Date().getTime();
    };
    SixFortyScraper.prototype.preprocessBody = function (body) {
        // Strip "parseMusic(" from start and ");" from end
        var trimmed = body.substring(11, body.length - 2);
        return trimmed;
    };
    SixFortyScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var title = jsonData['/6forty'].title;
        var split = title.split("-");
        if (split.length > 1) {
            return {
                Artist: split[0].trim(),
                Track: split[1].trim()
            };
        }
        return { Artist: null, Track: null };
    };
    return SixFortyScraper;
}(jsonScrap.JsonScraper));
exports.SixFortyScraper = SixFortyScraper;
//# sourceMappingURL=SixFortyScraper.js.map