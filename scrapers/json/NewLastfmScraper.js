/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var NewLastfmScraper = (function (_super) {
    __extends(NewLastfmScraper, _super);
    function NewLastfmScraper(name, apiKey) {
        _super.call(this, name);
        this.apiKey = apiKey;
        // Only return songs as just played if they were scrobbled less than 20 minutes ago
        // The scrobbler will only scrobble once since it doesn't scrobble the same song twice in a row
        this.MAX_SCROBBLED_TIME = 20 * 60 * 1000;
    }
    NewLastfmScraper.prototype.getUrl = function (lastfmUsername) {
        if (!lastfmUsername) {
            throw "lastfmUsername is required";
        }
        return "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUsername + "&api_key=" +
            this.apiKey + "&limit=2&format=json";
    };
    NewLastfmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var track = jsonData['recenttracks']['track'];
        if (!track["artist"]) {
            track = track[0];
        }
        if (track["@attr"] && track["@attr"]["nowplaying"] == "true") {
            return { Artist: track['artist']['#text'], Track: track['name'] };
        }
        return { Artist: null, Track: null };
    };
    NewLastfmScraper.prototype.extractJustPlayedSong = function (jsonData) {
        var tracks = jsonData['recenttracks']['track'];
        var track = tracks[0];
        if (track["@attr"] && track["@attr"]["nowplaying"] == "true") {
            if (tracks.length == 0) {
                return { Artist: null, Track: null };
            }
            track = tracks[1];
        }
        if (!('date' in track) || !('uts' in track['date'])) {
            return { Artist: null, Track: null };
        }
        var scrobbledTime = parseInt(track['date']['uts']) * 1000;
        var timeNow = new Date().getTime();
        if (scrobbledTime && timeNow && (timeNow - scrobbledTime < this.MAX_SCROBBLED_TIME)) {
            return { Artist: track['artist']['#text'], Track: track['name'] };
        }
        return { Artist: null, Track: null };
    };
    return NewLastfmScraper;
})(jsonScrap.JsonScraper);
exports.NewLastfmScraper = NewLastfmScraper;
//# sourceMappingURL=NewLastfmScraper.js.map