"use strict";
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
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
var Go963Scraper = (function (_super) {
    __extends(Go963Scraper, _super);
    function Go963Scraper(name) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://player.listenlive.co/31261/en/songhistory";
        return _this;
    }
    Go963Scraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseHtml(body, callback);
        });
    };
    Go963Scraper.prototype.parseHtml = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var songsPattern = /var songs = (\[.*]);/g;
        var songsMatches = songsPattern.exec(body);
        if (songsMatches && songsMatches.length > 1) {
            try {
                var songsJson = JSON.parse(songsMatches[1]);
                if (songsJson && songsJson.length > 0) {
                    callback(null, { Artist: songsJson[0].artist, Track: songsJson[0].title });
                    return;
                }
            }
            catch (e) {
            }
        }
        callback(null, { Artist: null, Track: null });
    };
    return Go963Scraper;
}(scrap.Scraper));
exports.Go963Scraper = Go963Scraper;
//# sourceMappingURL=Go963Scraper.js.map