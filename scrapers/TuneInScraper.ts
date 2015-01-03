/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class TuneInScraper extends scrap.CheerioScraper {
    private url: string;

    constructor(name:string, radioId: string) {
        super(name);
        this.url = "http://tunein.com/radio/" + radioId + "/";
    }

    public getUrl(): string {
        return this.url;
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {

        var nowPlaying = $('#nowPlayingInfo div.now-playing');
        var song = nowPlaying.next().text().trim();
        var splitSong = song.split(" - ");

        if (splitSong.length < 2) {
            winston.warn("TuneInScraper: Could not split song " + song);
            callback(null, { Artist: null, Track: null });
        } else {
            callback(null, { Artist: splitSong[1].trim(), Track: splitSong[0].trim() });
        }
    }
}