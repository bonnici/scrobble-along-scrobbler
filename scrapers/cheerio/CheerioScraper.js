/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
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
var scrap = require("../Scraper");
var cheerio = require("cheerio");
var winston = require("winston");
var CheerioScraper = (function (_super) {
    __extends(CheerioScraper, _super);
    function CheerioScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.xmlMode = false;
        return _this;
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