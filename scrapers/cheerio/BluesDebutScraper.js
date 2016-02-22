/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./CheerioScraper");
var BluesDebutScraper = (function (_super) {
    __extends(BluesDebutScraper, _super);
    function BluesDebutScraper(name) {
        _super.call(this, name);
    }
    BluesDebutScraper.prototype.getUrl = function () {
        return "http://streamdb4web.securenetsystems.net/player_status_update/BLUSDBUT.xml?randStr=" + Math.random();
    };
    BluesDebutScraper.prototype.parseCheerio = function ($, callback) {
        var artistElem = $('playlist artist');
        var titleElem = $('playlist title');
        var artist = artistElem.text();
        var title = titleElem.text();
        if (artist.trim() && title.trim()) {
            callback(null, { Artist: artist.trim(), Track: title.trim() });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return BluesDebutScraper;
})(scrap.CheerioScraper);
exports.BluesDebutScraper = BluesDebutScraper;
//# sourceMappingURL=BluesDebutScraper.js.map