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
var scrap = require("./JsonScraper");
var CprScraper = (function (_super) {
    __extends(CprScraper, _super);
    function CprScraper(name, urlName) {
        var _this = _super.call(this, name) || this;
        _this.baseUrl = "http://playlist.cprnetwork.org/api/" + urlName;
        return _this;
    }
    CprScraper.prototype.getUrl = function (lastfmUsername) {
        return this.baseUrl + "?n=" + new Date().getTime();
    };
    CprScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData[0].artist,
            Track: jsonData[0].title
        };
    };
    return CprScraper;
}(scrap.JsonScraper));
exports.CprScraper = CprScraper;
//# sourceMappingURL=CprScraper.js.map