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
var scrap = require("./JsonScraper");
var ChipbitScraper = (function (_super) {
    __extends(ChipbitScraper, _super);
    function ChipbitScraper(name) {
        return _super.call(this, name) || this;
    }
    ChipbitScraper.prototype.getUrl = function () {
        return "http://stream.chipbit.net:2199/external/rpc.php?m=streaminfo.get&username=chipbit&charset=&mountpoint=&rid=chipbit&_="
            + new Date().getTime();
    };
    ChipbitScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return ChipbitScraper;
}(scrap.JsonScraper));
exports.ChipbitScraper = ChipbitScraper;
//# sourceMappingURL=ChipbitScraper.js.map