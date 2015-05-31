/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var FusionScraper = (function (_super) {
    __extends(FusionScraper, _super);
    function FusionScraper(name, url) {
        _super.call(this, name);
    }
    FusionScraper.prototype.getUrl = function (scraperParam) {
        return "http://load.nexusradio.fm/" + scraperParam + "/title/nowplaying.php";
    };
    FusionScraper.prototype.parseCheerio = function ($, callback) {
        var divs = $('body div div');
        if (divs.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var trackAndArtist = divs.eq(0).text().trim();
        var dashIndex = trackAndArtist.indexOf("-");
        if (dashIndex < 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var track = trackAndArtist.substring(0, dashIndex).trim();
        var artist = trackAndArtist.substring(dashIndex + 1).trim();
        callback(null, { Artist: artist, Track: track });
    };
    return FusionScraper;
})(scrap.CheerioScraper);
exports.FusionScraper = FusionScraper;
//# sourceMappingURL=FusionScraper.js.map