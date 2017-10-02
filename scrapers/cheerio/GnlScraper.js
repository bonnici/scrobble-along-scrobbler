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
var GnlScraper = (function (_super) {
    __extends(GnlScraper, _super);
    function GnlScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.ignoreStatusCode = true;
        return _this;
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