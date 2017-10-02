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
var scrap = require("../Scraper");
var winston = require("winston");
/*
Base class for scrapers that get JSON data. Other JSON scrapers should be migrated to this eventually.
To use, set this.url in the constructor after calling super and implement extractSong.
*/
var JsonScraper = (function (_super) {
    __extends(JsonScraper, _super);
    function JsonScraper(name) {
        return _super.call(this, name) || this;
    }
    JsonScraper.prototype.fetchAndParse = function (callback, scraperParam) {
        var _this = this;
        this.fetchUrl(this.getUrl(scraperParam), function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            if (!body) {
                winston.warn("JsonScraper: No/invalid body", body);
                callback(null, { Artist: null, Track: null });
                return;
            }
            body = _this.preprocessBody(body);
            try {
                var json = JSON.parse(body);
            }
            catch (e) {
                //winston.error("Could not parse JSON body", body);
                winston.error("Could not parse JSON body");
                callback("Could not parse JSON body", null);
                return;
            }
            try {
                var nowPlayingSong = _this.extractNowPlayingSong(json);
                var justPlayedSong = _this.extractJustPlayedSong(json);
                callback(null, nowPlayingSong, justPlayedSong);
                return;
            }
            catch (err) {
                //winston.warn("JsonScraper: Invalid JSON", json);
                winston.warn("JsonScraper: Invalid JSON");
            }
            callback(null, { Artist: null, Track: null });
        });
    };
    JsonScraper.prototype.getUrl = function (scraperParam) {
        throw "Abstract function";
    };
    JsonScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return null;
    };
    JsonScraper.prototype.extractJustPlayedSong = function (jsonData) {
        return null;
    };
    JsonScraper.prototype.preprocessBody = function (body) {
        return body;
    };
    return JsonScraper;
}(scrap.Scraper));
exports.JsonScraper = JsonScraper;
//# sourceMappingURL=JsonScraper.js.map