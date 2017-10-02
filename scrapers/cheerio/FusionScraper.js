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
var scrap = require("./CheerioScraper");
var FusionScraper = (function (_super) {
    __extends(FusionScraper, _super);
    function FusionScraper(name, url) {
        return _super.call(this, name) || this;
    }
    FusionScraper.prototype.getUrl = function (scraperParam) {
        return "http://load.nexusradio.fm/" + scraperParam + "/title/nowplaying.php";
    };
    FusionScraper.prototype.parseCheerio = function ($, callback) {
        var divs = $('body div div');
        if (divs.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var trackAndArtist = divs.eq(0).text().trim();
        var dashIndex = trackAndArtist.indexOf("-");
        if (dashIndex < 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var track = trackAndArtist.substring(0, dashIndex).trim();
        var artist = trackAndArtist.substring(dashIndex + 1).trim();
        callback(null, { Artist: artist, Track: track });
    };
    return FusionScraper;
}(scrap.CheerioScraper));
exports.FusionScraper = FusionScraper;
//# sourceMappingURL=FusionScraper.js.map