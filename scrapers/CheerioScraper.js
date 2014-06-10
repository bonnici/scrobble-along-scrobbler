/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./Scraper");


var cheerio = require("cheerio");
var winston = require("winston");

var CheerioScraper = (function (_super) {
    __extends(CheerioScraper, _super);
    function CheerioScraper(name) {
        _super.call(this, name);
    }
    CheerioScraper.prototype.getUrl = function () {
        throw "Abstract Class";
    };

    CheerioScraper.prototype.parseCheerio = function ($, callback) {
        throw "Abstract Class";
    };

    CheerioScraper.prototype.fetchAndParse = function (callback, scraperParam) {
        var _this = this;
        this.fetchUrl(this.getUrl(), function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }

            if (!body) {
                winston.warn("CheerioScraper: No HTML body");
                callback(null, { Artist: null, Track: null });
                return;
            }

            var $ = cheerio.load(body);
            _this.parseCheerio($, callback);
        });
    };
    return CheerioScraper;
})(scrap.Scraper);
exports.CheerioScraper = CheerioScraper;

//# sourceMappingURL=CheerioScraper.js.map
