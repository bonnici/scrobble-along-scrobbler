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
        return "http://radiobox2.omroep.nl/data/radiobox2/nowonair/2.json?npo_cc_skip_wall=1";
    };
    Radio2NLScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return {
            Artist: jsonData.results[0].songfile.artist.trim(),
            Track: jsonData.results[0].songfile.title.trim()
        };
    };
    return Radio2NLScraper;
})(jsonScrap.JsonScraper);
exports.Radio2NLScraper = Radio2NLScraper;
//# sourceMappingURL=Radio2NLScraper.js.map