/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class FusionScraper extends scrap.CheerioScraper {

    constructor(name:string, url?: string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://load.nexusradio.fm/" + scraperParam + "/title/nowplaying.php";
    }

    public parseCheerio($:any, callback:(err, newNowPlayingSong:song.Song, justScrobbledSong?:song.Song) => void):void {
        var divs =  $('body div div');

        if (divs.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var trackAndArtist = divs.eq(0).text().trim();
        var dashIndex = trackAndArtist.indexOf("-");
        if (dashIndex < 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var track = trackAndArtist.substring(0,dashIndex).trim();
        var artist = trackAndArtist.substring(dashIndex + 1).trim();

        callback(null, { Artist: artist, Track: track });
    }
}