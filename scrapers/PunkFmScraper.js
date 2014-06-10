/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./JsonScraper");




var PunkFmScraper = (function (_super) {
    __extends(PunkFmScraper, _super);
    function PunkFmScraper(name) {
        _super.call(this, name);
    }
    PunkFmScraper.prototype.getUrl = function () {
        return "http://centovacast.galaxywebsolutions.com/external/rpc.php?m=streaminfo.get&username=punkfm&charset=&mountpoint=&rid=punkfm&_=" + new Date().getTime();
    };

    PunkFmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return PunkFmScraper;
})(scrap.JsonScraper);
exports.PunkFmScraper = PunkFmScraper;

//# sourceMappingURL=PunkFmScraper.js.map
