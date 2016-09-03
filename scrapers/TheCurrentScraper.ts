/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import winston = require("winston");

export class TheCurrentScraper extends scrap.Scraper {
    private url: string;

    constructor(name:string, radioId:string) {
        super(name);
        this.url =  "http://www.thecurrent.org/listen";
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        this.fetchUrl(this.url, (err, body) => {
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

        var titlePattern = /<div class="player-title js-update-title">(.*?)<\/div>/;
        var artistPattern = /<div class="player-artist js-update-artist">(.*?)<\/div>/;

        var titleMatches = titlePattern.exec(body);
        var artistMatches = artistPattern.exec(body);

        if (artistMatches && artistMatches.length > 1 && titleMatches && titleMatches.length > 1) {
            callback(null, {
                Artist: artistMatches[1].trim(),
                Track: titleMatches[1].trim()
            });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    }
}