/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var winston = require("winston");
var RockFmScraper = (function (_super) {
    __extends(RockFmScraper, _super);
    function RockFmScraper(name) {
        _super.call(this, name);
    }
    RockFmScraper.prototype.getUrl = function (scraperParam) {
        // This approximately the time that's used on the site, it returns with long polling for times after this
        var timeToUse = (new Date().getTime() - (60 * 60 * 60)) * 10000;
        return "http://ps9.pubnub.com/subscribe/sub-eff4f180-d0c2-11e1-bee3-1b5222fb6268/np_36/0/" +
            timeToUse + "?uuid=84d3e4f8-33d2-4a4c-a974-9d88a3f92965";
    };
    RockFmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var artist = jsonData[0][0].artist.trim();
        var track = jsonData[0][0].title.trim();
        if (artist && track && artist != 'No Artist Info Available' && track != 'No Track info Available') {
            return {
                Artist: jsonData[0][0].artist.trim(),
                Track: jsonData[0][0].title.trim()
            };
        }
        else {
            winston.info("RockFmScraper: No song playing");
            return { Artist: null, Track: null };
        }
    };
    return RockFmScraper;
})(jsonScrap.JsonScraper);
exports.RockFmScraper = RockFmScraper;
/*
export class RockFmScraper extends scrap.CheerioScraper {
    private url: string;

    constructor(name:string) {
        super(name);
        this.url = "http://www.rockfm.co.uk";
    }

    public getUrl(): string {
        return this.url;
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var nowPlayingSpans = $('#now-playing-track span');

        if (nowPlayingSpans.length < 3) {
            winston.warn("RockFmScraper: Not enough now playing spans (" + nowPlayingSpans.length + ")");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artist = nowPlayingSpans.eq(1).text();
        var song = nowPlayingSpans.eq(2).text();

        if (!artist || !song) {
            winston.warn("RockFmScraper: Invalid artist or song (" + artist + "/" + song + ")");
            callback(null, { Artist: null, Track: null });
        }
        else {
            callback(null, { Artist: artist, Track: song });
        }
    }
}
*/
//# sourceMappingURL=RockFmScraper.js.map