"use strict";
/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
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
var NexusScraper = (function (_super) {
    __extends(NexusScraper, _super);
    function NexusScraper(name, url, trackFirst) {
        var _this = _super.call(this, name) || this;
        _this.url = url;
        _this.trackFirst = trackFirst;
        return _this;
    }
    NexusScraper.prototype.getUrl = function (scraperParam) {
        return this.url;
    };
    NexusScraper.prototype.parseCheerio = function ($, callback) {
        var infoDivs = $('body div div');
        if (infoDivs.length > 1) {
            var track = infoDivs.eq(this.trackFirst ? 0 : 1).text();
            var artist = infoDivs.eq(this.trackFirst ? 1 : 0).text();
            if (track && artist) {
                callback(null, { Artist: artist.trim(), Track: track.trim() });
                return;
            }
        }
        callback(null, { Artist: null, Track: null });
    };
    return NexusScraper;
}(scrap.CheerioScraper));
exports.NexusScraper = NexusScraper;
//# sourceMappingURL=NexusScraper.js.map