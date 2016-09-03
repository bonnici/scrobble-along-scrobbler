/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class RaveoScraper extends scrap.CheerioScraper {

    constructor(name:string) {
        super(name);
    }
    
    getUrl(): string {
        return "http://raveo.fm/load/title/nowplaying-wordpress.php";
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var infoDivs = $('body div div');
        
        if (infoDivs.length > 1) {
            var track = infoDivs.eq(0).text();
            var artist = infoDivs.eq(1).text();
            
            if (track && artist) {
                callback(null, { Artist: artist.trim(), Track: track.trim() });
                return;
            }
        }
        
        callback(null, { Artist: null, Track: null });
    }
}