/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var SpiffRadioScraper = (function (_super) {
    __extends(SpiffRadioScraper, _super);
    function SpiffRadioScraper(name, id) {
        _super.call(this, name);
        this.id = id;
        this.xmlMode = true;
    }
    SpiffRadioScraper.prototype.getUrl = function (lastfmUsername) {
        if (this.id) {
            var urlSuffix = this.id + "/?xspf=1";
        }
        else {
            var urlSuffix = lastfmUsername;
        }
        return " http://www.spiff-radio.org/station/" + urlSuffix;
    };
    SpiffRadioScraper.prototype.parseCheerio = function ($, callback) {
        var tracks = $('trackList track');
        if (tracks.length > 0) {
            var firstTrack = tracks.eq(0);
            var title = firstTrack.children('title').eq(0).text();
            var artist = firstTrack.children('creator').eq(0).text();
            if (title && artist) {
                callback(null, { Artist: artist, Track: title });
                return;
            }
        }
        callback(null, { Artist: null, Track: null });
    };
    return SpiffRadioScraper;
})(scrap.CheerioScraper);
exports.SpiffRadioScraper = SpiffRadioScraper;
//# sourceMappingURL=SpiffRadioScraper.js.map