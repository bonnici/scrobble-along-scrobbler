/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class NexusScraper extends scrap.CheerioScraper {
    constructor(name:string, private url: string, private trackFirst: boolean) {
        super(name);
    }
    
    getUrl(scraperParam?:string): string {
        return this.url;
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var infoDivs = $('body div div');
        
        if (infoDivs.length > 1) {
            var track = infoDivs.eq(this.trackFirst ? 0 : 1).text();
            var artist = infoDivs.eq(this.trackFirst ? 1 : 0).text();
            
            if (track && artist) {
                callback(null, { Artist: artist.trim(), Track: track.trim() });
                return;
            }
        }
        
        callback(null, { Artist: null, Track: null });
    }
}