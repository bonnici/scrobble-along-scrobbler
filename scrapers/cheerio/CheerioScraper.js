/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("../Scraper");
var cheerio = require("cheerio");
var winston = require("winston");
var CheerioScraper = (function (_super) {
    __extends(CheerioScraper, _super);
    function CheerioScraper(name) {
        _super.call(this, name);
        this.xmlMode = false;
    }
    CheerioScraper.prototype.getUrl = function (scraperParam) {
        throw "Abstract Class";
    };
    CheerioScraper.prototype.parseCheerio = function ($, callback) {
        throw "Abstract Class";
    };
    CheerioScraper.prototype.fetchAndParse = function (callback, scraperParam) {
        var _this = this;
        this.fetchUrl(this.getUrl(scraperParam), function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            if (!body) {
                winston.warn("CheerioScraper: No HTML body");
                callback(null, { Artist: null, Track: null });
                return;
            }
            try {
                var $ = cheerio.load(body, { xmlMode: _this.xmlMode });
                _this.parseCheerio($, callback);
            }
            catch (e) {
                winston.warn("CheerioScraper: Could not parse HTML");
                callback("Could not parse HTML", null);
            }
        });
    };
    return CheerioScraper;
}(scrap.Scraper));
exports.CheerioScraper = CheerioScraper;
//# sourceMappingURL=CheerioScraper.js.map