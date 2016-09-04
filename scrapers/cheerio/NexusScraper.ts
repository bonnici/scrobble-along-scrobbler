/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class NexusScraper extends scrap.CheerioScraper {
    private trackFirst = true;
    
    constructor(name:string) {
        super(name);
    }
    
    getUrl(scraperParam?:string): string {
        var split = scraperParam.split('~');
        if (split && split.length > 1) {
            this.trackFirst = split[1] == 'true';
            return split[0];
        }
        
        return scraperParam;
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