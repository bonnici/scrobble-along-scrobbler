/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");
var winston = require("winston");
var moment = require("moment-timezone");
var CbcRadio2Scraper = (function (_super) {
    __extends(CbcRadio2Scraper, _super);
    function CbcRadio2Scraper(name) {
        _super.call(this, name);
    }
    CbcRadio2Scraper.prototype.getUrl = function () {
        var now = moment().tz("America/New_York");
        return "http://music.cbc.ca/broadcastlogs/broadcastlogs.aspx?broadcastdate=" + now.format("YYYY-MM-DD");
    };
    CbcRadio2Scraper.prototype.parseCheerio = function ($, callback) {
        var tracks = $('div.logShowEntry');
        var now = moment().tz("America/New_York");
        var trackDateTime = moment().tz("America/New_York"); // hours/seconds will be updated later
        trackDateTime.set('second', 0);
        trackDateTime.set('millisecond', 0);
        var curTrackIndex = null;
        tracks.each(function (idx) {
            var _this = $(this); // Trick TypeScript parser
            var timeElem = _this.find('div.logEntryTime');
            if (timeElem) {
                var timeText = timeElem.text().trim();
                var trackTime = moment(timeText, "hh:mm A");
                trackDateTime.set('hour', trackTime.get('hour'));
                trackDateTime.set('minute', trackTime.get('minute'));
                if (trackDateTime > now) {
                    curTrackIndex = idx - 1;
                    return false; // break
                }
            }
            return;
        });
        if (curTrackIndex === null || curTrackIndex < 0) {
            winston.warn("CbcRadio2Scraper could not find current track");
            callback(null, { Artist: null, Track: null });
        }
        else {
            var trackElem = tracks.eq(curTrackIndex);
            var trackName = trackElem.find('h3').text().trim();
            var matchingDt = null;
            trackElem.find('dt').each(function () {
                var _this = $(this); // Trick TypeScript parser
                if (_this.text().trim().toLowerCase() == 'artist') {
                    matchingDt = _this;
                    return false;
                }
                return;
            });
            if (!matchingDt) {
                return null;
            }
            var matchingDd = matchingDt.next('dd');
            var trackArtist = matchingDd ? matchingDd.text().trim() : null;
            if (trackArtist) {
                callback(null, { Artist: trackArtist, Track: this.capitalize(trackName) });
            }
            else {
                winston.warn("CbcRadio2Scraper could not find artist");
                callback(null, { Artist: null, Track: null });
            }
        }
    };
    return CbcRadio2Scraper;
})(scrap.CheerioScraper);
exports.CbcRadio2Scraper = CbcRadio2Scraper;
//# sourceMappingURL=CbcRadio2Scraper.js.map