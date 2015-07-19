/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jsonScrap = require("./JsonScraper");
var SixFortyScraper = (function (_super) {
    __extends(SixFortyScraper, _super);
    function SixFortyScraper(name) {
        _super.call(this, name);
    }
    SixFortyScraper.prototype.getUrl = function (scraperParam) {
        return "http://54.173.171.80:8000/json.xsl?callback=parseMusic&_=" + new Date().getTime();
    };
    SixFortyScraper.prototype.preprocessBody = function (body) {
        // Strip "parseMusic(" from start and ");" from end
        var trimmed = body.substring(11, body.length - 2);
        return trimmed;
    };
    SixFortyScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var title = jsonData['/6forty'].title;
        var split = title.split("-");
        if (split.length > 1) {
            return {
                Artist: split[0].trim(),
                Track: split[1].trim()
            };
        }
        return { Artist: null, Track: null };
    };
    return SixFortyScraper;
})(jsonScrap.JsonScraper);
exports.SixFortyScraper = SixFortyScraper;
//# sourceMappingURL=SixFortyScraper.js.map