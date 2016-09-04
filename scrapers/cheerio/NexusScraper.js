/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./CheerioScraper");
var NexusScraper = (function (_super) {
    __extends(NexusScraper, _super);
    function NexusScraper(name) {
        _super.call(this, name);
        this.trackFirst = true;
    }
    NexusScraper.prototype.getUrl = function (scraperParam) {
        var split = scraperParam.split('~');
        if (split && split.length > 1) {
            this.trackFirst = split[1] == 'true';
            return split[0];
        }
        return scraperParam;
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