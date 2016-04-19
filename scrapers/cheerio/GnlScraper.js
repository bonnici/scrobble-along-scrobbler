/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./CheerioScraper");
var GnlScraper = (function (_super) {
    __extends(GnlScraper, _super);
    function GnlScraper(name) {
        _super.call(this, name);
        this.ignoreStatusCode = true;
    }
    GnlScraper.prototype.getUrl = function () {
        return "http://gnl.fm/radiodj/live_stat.php";
    };
    GnlScraper.prototype.parseCheerio = function ($, callback) {
        var trackTd = $('td.playing_track');
        if (trackTd.length == 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var trackText = trackTd.eq(0).text();
        var split = trackText.split(" - ");
        if (split.length < 2) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artist = split[0];
        var title = split[1];
        if (title.lastIndexOf("[") > 0) {
            title = title.substr(0, title.lastIndexOf("[") - 1);
        }
        callback(null, { Artist: artist, Track: title });
    };
    return GnlScraper;
}(scrap.CheerioScraper));
exports.GnlScraper = GnlScraper;
//# sourceMappingURL=GnlScraper.js.map