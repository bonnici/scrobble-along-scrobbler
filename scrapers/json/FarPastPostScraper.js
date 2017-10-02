"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
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
var FarPastPostScraper = (function (_super) {
    __extends(FarPastPostScraper, _super);
    function FarPastPostScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://192.99.34.205/external/rpc.php?m=streaminfo.get&username=farpastp&charset=&mountpoint=&rid=farpastp&_="
            + new Date().getTime();
        return _this;
    }
    FarPastPostScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };
    FarPastPostScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return FarPastPostScraper;
}(scrap.JsonScraper));
exports.FarPastPostScraper = FarPastPostScraper;
//# sourceMappingURL=FarPastPostScraper.js.map