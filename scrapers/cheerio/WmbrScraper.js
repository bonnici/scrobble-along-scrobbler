/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var cheerio = require("cheerio");
var WmbrScraper = (function (_super) {
    __extends(WmbrScraper, _super);
    function WmbrScraper(name) {
        _super.call(this, name);
        this.xmlMode = true;
    }
    WmbrScraper.prototype.getUrl = function () {
        return "http://wmbr.org/dynamic.xml";
    };
    WmbrScraper.prototype.parseCheerio = function ($, callback) {
        var wmbrPlays = $('wmbr_plays');
        if (wmbrPlays.length > 0) {
            var playsHtml = wmbrPlays.eq(0).text();
            var $plays = cheerio.load(playsHtml);
            var recent = $plays('p.recent');
            var artist = $plays('p.recent b');
            if (recent.length > 0 && artist.length > 0) {
                var artistText = artist.eq(0).text();
                if (artistText) {
                    var recentText = recent.eq(0).text();
                    var artistEnd = recentText.indexOf(artistText) + artistText.length + 2;
                    if (artistEnd < recentText.length) {
                        var titleText = recentText.substring(artistEnd);
                        if (titleText) {
                            callback(null, { Artist: artistText, Track: titleText });
                        }
                    }
                }
            }
        }
        callback(null, { Artist: null, Track: null });
    };
    return WmbrScraper;
})(scrap.CheerioScraper);
exports.WmbrScraper = WmbrScraper;
//# sourceMappingURL=WmbrScraper.js.map