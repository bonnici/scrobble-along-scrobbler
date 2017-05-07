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
var winston = require("winston");
var WfkuScraper = (function (_super) {
    __extends(WfkuScraper, _super);
    function WfkuScraper(name, station) {
        var _this = _super.call(this, name) || this;
        _this.station = station;
        return _this;
    }
    WfkuScraper.prototype.getUrl = function () {
        return "http://www.wfku.org/player/recenttracks.php?station=" + this.station + "&_=" + new Date().getTime();
    };
    WfkuScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var fullName = jsonData.results[0].title;
        var splitName = fullName.split(" - ");
        if (splitName.length >= 2) {
            return { Artist: splitName[0], Track: splitName[1] };
        }
        else {
            winston.info("WfkuScraper could not find song");
            return { Artist: null, Track: null };
        }
    };
    return WfkuScraper;
}(scrap.JsonScraper));
exports.WfkuScraper = WfkuScraper;
//# sourceMappingURL=WfkuScraper.js.map