/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");

var winston = require("winston");

var WfkuScraper = (function (_super) {
    __extends(WfkuScraper, _super);
    function WfkuScraper(name, station) {
        _super.call(this, name);
        this.station = station;
    }
    WfkuScraper.prototype.getUrl = function () {
        return "http://www.wfku.org/player/recenttracks.php?station=" + this.station + "&_=" + new Date().getTime();
    };

    WfkuScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var fullName = jsonData.results[0].title;
        var splitName = fullName.split(" - ");
        if (splitName.length >= 2) {
            return { Artist: splitName[0], Track: splitName[1] };
        } else {
            winston.info("WfkuScraper could not find song");
            return { Artist: null, Track: null };
        }
    };
    return WfkuScraper;
})(scrap.JsonScraper);
exports.WfkuScraper = WfkuScraper;
//# sourceMappingURL=WfkuScraper.js.map
