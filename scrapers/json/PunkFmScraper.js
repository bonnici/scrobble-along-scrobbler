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
var PunkFmScraper = (function (_super) {
    __extends(PunkFmScraper, _super);
    function PunkFmScraper(name) {
        return _super.call(this, name) || this;
    }
    PunkFmScraper.prototype.getUrl = function () {
        return "http://centovacast.galaxywebsolutions.com/external/rpc.php?m=streaminfo.get&username=punkfm&charset=&mountpoint=&rid=punkfm&_="
            + new Date().getTime();
    };
    PunkFmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return PunkFmScraper;
}(scrap.JsonScraper));
exports.PunkFmScraper = PunkFmScraper;
//# sourceMappingURL=PunkFmScraper.js.map