/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import winston = require("winston");

export class NoEsFmScraper extends scrap.Scraper {

    constructor(name:string) {
        super(name);
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var url = "http://marci1319.getmarci.com/ajaxRequester.php?_=" + new Date().getTime() + "&s=marci1319";
        this.fetchUrl(url, (err, body) => {
            if (err) {
                callback(err, null);
                return;
            }
            this.parseBody(body, callback);
        });
    }

    private parseBody(body: string, callback: (err, song:song.Song) => void): void {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artistEnd = body.indexOf(" - ");
        if (artistEnd < 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artist = body.substring(0, artistEnd);
        var track = body.substring(artistEnd + 3);

        var twitterStart = track.indexOf("@");
        if (twitterStart > 0) {
            track = track.substr(0, twitterStart - 1);
        }

        if (artist && track) {
            callback(null, { Artist: artist, Track: track });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    }
}