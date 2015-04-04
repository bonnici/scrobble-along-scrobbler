var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var DrDkScraper = (function (_super) {
    __extends(DrDkScraper, _super);
    function DrDkScraper(name) {
        _super.call(this, name);
    }
    DrDkScraper.prototype.getUrl = function (scraperParam) {
        var url = "http://www.dr.dk/radio/live/" + scraperParam + "/";
        return url;
    };
    DrDkScraper.prototype.parseCheerio = function ($, callback) {
        // Can't look for li.now-playing since that class is added after the page loads
        var trackDivs = $('ul.playlist-items li.track');
        if (trackDivs.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var trackInfo = trackDivs.eq(0).find('div.trackInfo');
        if (trackInfo.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var trackInfoChildren = trackInfo.eq(0).children();
        if (trackInfoChildren.length < 2) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artistName = '';
        var trackName = '';
        // Go through each child to get things like 'feat. X' in the artist name
        trackInfoChildren.each(function (i, elem) {
            var text = $(this).text().trim();
            if ($(this).hasClass('track')) {
                trackName += text + ' ';
            }
            else {
                artistName += text + ' ';
            }
        });
        if (trackName && artistName) {
            callback(null, { Artist: artistName.trim(), Track: trackName.trim() });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return DrDkScraper;
})(scrap.CheerioScraper);
exports.DrDkScraper = DrDkScraper;
//# sourceMappingURL=DrDkScraper.js.map