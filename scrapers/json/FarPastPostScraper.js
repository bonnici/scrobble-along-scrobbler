/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");
var FarPastPostScraper = (function (_super) {
    __extends(FarPastPostScraper, _super);
    function FarPastPostScraper(name) {
        _super.call(this, name);
        this.url = "http://192.99.34.205/external/rpc.php?m=streaminfo.get&username=farpastp&charset=&mountpoint=&rid=farpastp&_=" + new Date().getTime();
    }
    FarPastPostScraper.prototype.getUrl = function (lastfmUsername) {
        return this.url;
    };
    FarPastPostScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return FarPastPostScraper;
})(scrap.JsonScraper);
exports.FarPastPostScraper = FarPastPostScraper;
//# sourceMappingURL=FarPastPostScraper.js.map