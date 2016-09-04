/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var RadioUScraper = (function (_super) {
    __extends(RadioUScraper, _super);
    function RadioUScraper(name) {
        _super.call(this, name);
    }
    RadioUScraper.prototype.getUrl = function () {
        return "http://cc.net2streams.com/external/rpc.php?m=streaminfo.get&username=live&rid=live&_=" + new Date().getTime();
    };
    RadioUScraper.prototype.extractNowPlayingSong = function (jsonData) {
        if (jsonData.data[0].track.artist === "Unknown") {
            return { Artist: null, Track: null };
        }
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return RadioUScraper;
}(jsonScrap.JsonScraper));
exports.RadioUScraper = RadioUScraper;
//# sourceMappingURL=RadioUScraper.js.map