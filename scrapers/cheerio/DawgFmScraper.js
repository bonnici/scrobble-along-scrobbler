/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
"use strict";
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
        this.xmlMode = true;
    }
    DawgFmScraper.prototype.getUrl = function () {
        return "http://www.dawgfm.com/cidg_fm.xml?_=" + new Date().getTime();
    };
    DawgFmScraper.prototype.parseCheerio = function ($, callback) {
        var entry = $('PlayList Entry');
        if (entry.length < 1) {
            winston.warn("DawgFmScraper: No entry");
            callback(null, { Artist: null, Track: null });
            return;
        }
        callback(null, { Artist: entry.eq(0)[0].attribs.Artist, Track: entry.eq(0)[0].attribs.Title });
    };
    return DawgFmScraper;
}(scrap.CheerioScraper));
exports.DawgFmScraper = DawgFmScraper;
//# sourceMappingURL=DawgFmScraper.js.map