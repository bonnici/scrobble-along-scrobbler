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
var jsonScrap = require("./JsonScraper");
var RadioUScraper = (function (_super) {
    __extends(RadioUScraper, _super);
    function RadioUScraper(name) {
        return _super.call(this, name) || this;
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