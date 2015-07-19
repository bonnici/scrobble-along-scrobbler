/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class VodafoneFmScraper extends scrap.CheerioScraper {
    private url: string;

    constructor(name:string) {
        super(name);
        this.url = "http://www.vodafone.fm/rewind";
    }

    public getUrl(): string {
        return this.url;
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var items = $('#rewind_list #radio_log_item');
        var song = items.eq(0);

        if (song && song.attr('artist') && song.attr('title')) {
            callback(null, { Artist: song.attr('artist').trim(), Track: song.attr('title').trim() });
        }
        callback(null, null, { Artist: null, Track: null });


        /*
        var nowPlaying = $('#nowPlayingInfo div.now-playing');
        var song = nowPlaying.next().text().trim();
        var splitSong = song.split(" - ");

        if (splitSong.length < 2) {
            winston.warn("TuneInScraper: Could not split song " + song);
            callback(null, { Artist: null, Track: null });
        } else {
            callback(null, { Artist: splitSong[1].trim(), Track: splitSong[0].trim() });
        }
        */
    }
}