/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class Wave965HtmlScraper extends scrap.CheerioScraper {

    constructor(name:string, channel?:string) {
        super(name);
    }

    public getUrl(): string {
        return "http://www.wave965.com/music/playlist/";
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {

        var nowPlaying = $('div #nowPlaying');
        // Can't use this - it takes too long to get (~5 seconds)
        winston.info(nowPlaying.eq(0).text());

        callback(null, { Artist: null, Track: null });
    }
}