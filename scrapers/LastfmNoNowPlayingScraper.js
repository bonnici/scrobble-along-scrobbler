/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var jsonScrap = require("./JsonScraper");



var LastfmNoNowPlayingScraper = (function (_super) {
    __extends(LastfmNoNowPlayingScraper, _super);
    function LastfmNoNowPlayingScraper(name, apiKey) {
        _super.call(this, name);
        this.apiKey = apiKey;
        // Only return songs as just played if they were scrobbled less than 5 minutes ago
        // The scrobbler will only scrobble once since it doesn't scrobble the same song twice in a row
        this.MAX_SCROBBLED_TIME = 5 * 60 * 1000;
    }
    LastfmNoNowPlayingScraper.prototype.getUrl = function (lastfmUsername) {
        if (!lastfmUsername) {
            throw "lastfmUsername is required";
        }

        return "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUsername + "&api_key=" + this.apiKey + "&limit=1&format=json";
    };

    LastfmNoNowPlayingScraper.prototype.extractJustPlayedSong = function (jsonData) {
        var track = jsonData['recenttracks']['track'];

        if (!track["artist"]) {
            track = track[0];
        }

        var scrobbledTime = parseInt(track['date']['uts']) * 1000;
        var timeNow = new Date().getTime();

        if (scrobbledTime && timeNow && (timeNow - scrobbledTime < this.MAX_SCROBBLED_TIME)) {
            return { Artist: track['artist']['#text'], Track: track['name'] };
        }

        return { Artist: null, Track: null };
    };
    return LastfmNoNowPlayingScraper;
})(jsonScrap.JsonScraper);
exports.LastfmNoNowPlayingScraper = LastfmNoNowPlayingScraper;

//# sourceMappingURL=LastfmNoNowPlayingScraper.js.map
