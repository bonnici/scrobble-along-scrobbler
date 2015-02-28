/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class FusionScraper extends scrap.CheerioScraper {

    constructor(name:string, url?: string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://load.fusion.fm/" + scraperParam + "/title/nowplaying.php";
    }

    public parseCheerio($:any, callback:(err, newNowPlayingSong:song.Song, justScrobbledSong?:song.Song) => void):void {
        var divs =  $('body div div');

        if (divs.length < 2) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var track = divs.eq(0).text().trim();
        var artist = divs.eq(1).text().trim();

        callback(null, { Artist: artist, Track: track });
    }
}