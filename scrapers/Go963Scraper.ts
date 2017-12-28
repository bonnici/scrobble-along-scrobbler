/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import winston = require("winston");

export class Go963Scraper extends scrap.Scraper {
    private url: string;

    constructor(name:string) {
        super(name);
        this.url = "http://player.listenlive.co/31261/en/songhistory";
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        this.fetchUrl(this.url, (err, body) => {
            if (err) {
                callback(err, null);
                return;
            }
            this.parseHtml(body, callback);
        });
    }

    private parseHtml(body: string, callback: (err, song:song.Song) => void): void {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        let songsPattern = /var songs = (\[.*]);/g;
        let songsMatches = songsPattern.exec(body);

        if (songsMatches && songsMatches.length > 1) {
            try {
                let songsJson = JSON.parse(songsMatches[1]);
                if (songsJson && songsJson.length > 0) {
                    callback(null, {Artist: songsJson[0].artist, Track: songsJson[0].title});
                    return;
                }
            }
            catch (e) {
            }
        }
        
        callback(null, { Artist: null, Track: null });
    }
}