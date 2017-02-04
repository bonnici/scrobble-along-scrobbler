/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./Scraper");
var TheCurrentScraper = (function (_super) {
    __extends(TheCurrentScraper, _super);
    function TheCurrentScraper(name) {
        _super.call(this, name);
        this.url = "http://www.thecurrent.org/listen";
    }
    TheCurrentScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseBody(body, callback);
        });
    };
    TheCurrentScraper.prototype.parseBody = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var titlePattern = /<div class="player-title js-update-title">(.*?)<\/div>/;
        var artistPattern = /<div class="player-artist js-update-artist">(.*?)<\/div>/;
        var titleMatches = titlePattern.exec(body);
        var artistMatches = artistPattern.exec(body);
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
    return TheCurrentScraper;
}(scrap.Scraper));
exports.TheCurrentScraper = TheCurrentScraper;
//# sourceMappingURL=TheCurrentScraper.js.map