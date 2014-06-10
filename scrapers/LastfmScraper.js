/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var jsonScrap = require("./JsonScraper");



var LastfmScraper = (function (_super) {
    __extends(LastfmScraper, _super);
    function LastfmScraper(name, apiKey) {
        _super.call(this, name);
        this.apiKey = apiKey;
    }
    LastfmScraper.prototype.getUrl = function (lastfmUsername) {
        if (!lastfmUsername) {
            throw "lastfmUsername is required";
        }

        return "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUsername + "&api_key=" + this.apiKey + "&limit=1&format=json";
    };

    LastfmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var track = jsonData['recenttracks']['track'];

        if (!track["artist"]) {
            track = track[0];
        }

        if (track["@attr"] && track["@attr"]["nowplaying"] == "true") {
            return { Artist: track['artist']['#text'], Track: track['name'] };
        }

        return { Artist: null, Track: null };
    };
    return LastfmScraper;
})(jsonScrap.JsonScraper);
exports.LastfmScraper = LastfmScraper;

//# sourceMappingURL=LastfmScraper.js.map
