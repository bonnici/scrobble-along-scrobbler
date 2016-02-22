/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./CheerioScraper");
var winston = require("winston");
var DawgFmScraper = (function (_super) {
    __extends(DawgFmScraper, _super);
    function DawgFmScraper(name) {
        _super.call(this, name);
    }
    DawgFmScraper.prototype.getUrl = function () {
        return "http://www.dawgfm.com/cidg_fm.xml?_=" + new Date().getTime();
    };
    DawgFmScraper.prototype.parseCheerio = function ($, callback) {
        var artist = $('Artist');
        var title = $('SongTitle');
        if (artist.length < 1 || title.length < 1) {
            winston.warn("DawgFmScraper: No artist or song");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artistText = artist.eq(0).text();
        var titleText = title.eq(0).text();
        if (!artistText || !titleText) {
            winston.warn("DawgFmScraper: No artist or song text");
            callback(null, { Artist: null, Track: null });
            return;
        }
        callback(null, { Artist: this.capitalize(artistText), Track: this.capitalize(titleText) });
    };
    return DawgFmScraper;
})(scrap.CheerioScraper);
exports.DawgFmScraper = DawgFmScraper;
//# sourceMappingURL=DawgFmScraper.js.map