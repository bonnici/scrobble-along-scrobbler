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
var winston = require("winston");
var WfuvScraper = (function (_super) {
    __extends(WfuvScraper, _super);
    function WfuvScraper(name, jsonName) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://nowplaying.wfuv.org/playlistinfo2.php";
        _this.jsonName = jsonName;
        return _this;
    }
    WfuvScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseJson(body, callback);
        });
    };
    WfuvScraper.prototype.parseJson = function (body, callback) {
        if (!body || body.length < 14) {
            winston.warn("WfuvScraper: No/invalid body", body);
            callback(null, { Artist: null, Track: null });
            return;
        }
        body = body.trim().substring(12, body.length - 2);
        try {
            var json = JSON.parse(body);
        }
        catch (e) {
            winston.error("Could not parse JSON body", body);
            callback("Could not parse JSON body", null);
            return;
        }
        if (!json || !json[this.jsonName]) {
            winston.warn("WfuvScraper: Invalid JSON", json);
            callback(null, { Artist: null, Track: null });
            return;
        }
        if (!json[this.jsonName].artist || !json[this.jsonName].title) {
            winston.info("WfuvScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artist = json[this.jsonName].artist.trim();
        var title = json[this.jsonName].title.trim();
        if (!artist || !title) {
            winston.info("WfuvScraper could not find song");
            callback(null, { Artist: null, Track: null });
        }
        else {
            winston.info("WfuvScraper found song " + artist + " - " + title);
            callback(null, { Artist: artist, Track: title });
        }
    };
    return WfuvScraper;
}(scrap.Scraper));
exports.WfuvScraper = WfuvScraper;
//# sourceMappingURL=WfuvScraper.js.map