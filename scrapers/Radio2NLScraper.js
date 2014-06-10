/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var jsonScrap = require("./JsonScraper");



var Radio2NLScraper = (function (_super) {
    __extends(Radio2NLScraper, _super);
    function Radio2NLScraper(name) {
        _super.call(this, name);
    }
    Radio2NLScraper.prototype.getUrl = function (scraperParam) {
        return "http://www.radio2.nl/block/header/currentsong.json";
    };

    Radio2NLScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.data.songfile.artist.trim(),
            Track: jsonData.data.songfile.title.trim()
        };
    };
    return Radio2NLScraper;
})(jsonScrap.JsonScraper);
exports.Radio2NLScraper = Radio2NLScraper;

//# sourceMappingURL=Radio2NLScraper.js.map
