/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./CheerioScraper");
var RaveoScraper = (function (_super) {
    __extends(RaveoScraper, _super);
    function RaveoScraper(name) {
        _super.call(this, name);
    }
    RaveoScraper.prototype.getUrl = function () {
        return "http://raveo.fm/load/title/nowplaying-wordpress.php";
    };
    RaveoScraper.prototype.parseCheerio = function ($, callback) {
        var infoDivs = $('body div div');
        if (infoDivs.length > 1) {
            var track = infoDivs.eq(0).text();
            var artist = infoDivs.eq(1).text();
            if (track && artist) {
                callback(null, { Artist: artist.trim(), Track: track.trim() });
                return;
            }
        }
        callback(null, { Artist: null, Track: null });
    };
    return RaveoScraper;
}(scrap.CheerioScraper));
exports.RaveoScraper = RaveoScraper;
//# sourceMappingURL=RaveoScraper.js.map