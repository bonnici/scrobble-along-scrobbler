/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import winston = require("winston");

export class MarciScraper extends scrap.Scraper {
    private url: string;

    constructor(name:string, marciNumber:string) {
        super(name);
        this.url = "http://marci" + marciNumber + ".getmarci.com/ajaxRequester.php?_=" + new Date().getTime() + "&s=marci" + marciNumber;
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        this.fetchUrl(this.url, (err, body) => {
            if (err) {
                callback(err, null);
                return;
            }

            var split = body.split("-");
            if (split.length > 1) {
                callback(null, {
                    Artist: split[0].trim(),
                    Track: split[1].trim()
                });
            }
            callback(null, {
                Artist: null,
                Track: null
            });
        });
    }
}