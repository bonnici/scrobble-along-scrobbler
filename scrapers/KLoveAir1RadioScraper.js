/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
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
var scrap = require("./Scraper");
var winston = require("winston");
var KLoveAir1RadioScraper = (function (_super) {
    __extends(KLoveAir1RadioScraper, _super);
    function KLoveAir1RadioScraper(name, id) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://cdn.kloveair1.com/services/broadcast.asmx/GetRecentSongs?SiteId=" + id + "&format=xml";
        return _this;
    }
    KLoveAir1RadioScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseHtml(body, callback);
        });
    };
    KLoveAir1RadioScraper.prototype.parseHtml = function (body, callback) {
        if (!body) {
            winston.warn("KLoveAir1RadioScraper: No HTML body");
            callback(null, { Artist: null, Track: null });
            return;
        }
        // Cheerio not working, use regex
        var artistPattern = /<Artist>(.*?)<\/Artist>/;
        var artistMatches = artistPattern.exec(body);
        var titlePattern = /<Title>(.*?)<\/Title>/;
        var titleMatches = titlePattern.exec(body);
        if (artistMatches && artistMatches.length > 1 && titleMatches && titleMatches.length > 1) {
            callback(null, {
                Artist: artistMatches[1].trim(),
                Track: titleMatches[1].trim()
            });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return KLoveAir1RadioScraper;
}(scrap.Scraper));
exports.KLoveAir1RadioScraper = KLoveAir1RadioScraper;
//# sourceMappingURL=KLoveAir1RadioScraper.js.map