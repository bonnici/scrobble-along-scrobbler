/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./JsonScraper");
var XrayScraper = (function (_super) {
    __extends(XrayScraper, _super);
    function XrayScraper(name) {
        _super.call(this, name);
    }
    XrayScraper.prototype.getUrl = function (lastfmUsername) {
        return "http://xray.fm/api/tracks/current";
    };
    XrayScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return XrayScraper;
})(scrap.JsonScraper);
exports.XrayScraper = XrayScraper;
//# sourceMappingURL=XrayScraper.js.map