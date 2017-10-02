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
var HumanoDerechoScraper = (function (_super) {
    __extends(HumanoDerechoScraper, _super);
    function HumanoDerechoScraper(name) {
        return _super.call(this, name) || this;
    }
    HumanoDerechoScraper.prototype.getUrl = function () {
        return "http://142.44.167.189:2199/external/rpc.php?m=streaminfo.get&username=danzig&charset=&mountpoint=&rid=danzig&_=" + new Date().getTime();
    };
    HumanoDerechoScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return HumanoDerechoScraper;
}(jsonScrap.JsonScraper));
exports.HumanoDerechoScraper = HumanoDerechoScraper;
//# sourceMappingURL=HumanoDerechoScraper.js.map