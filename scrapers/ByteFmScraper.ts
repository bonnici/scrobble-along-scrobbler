/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class ByteFmScraper extends scrap.CheerioScraper {
    constructor(name:string) {
        super(name);
    }

    public getUrl(): string {
        return "http://byte.fm/php/content/home/new.php?q=undefined&sid=" + Math.random();
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var nowPlayingDiv = $('div#aktuell p a');

        if (nowPlayingDiv.length < 1) {
            winston.warn("ByteFmScraper: Could not find now playing div");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var song = nowPlayingDiv.text().trim();
        var songParts = song.split(" - ");

        if (songParts.length < 2) {
            winston.warn("ByteFmScraper: Could not split song name " + song);
            callback(null, { Artist: null, Track: null });
            return;
        }

        callback(null, { Artist: songParts[0].trim(), Track: songParts[1].trim() });
    }
}