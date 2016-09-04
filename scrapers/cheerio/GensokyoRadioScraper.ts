/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class GensokyoRadioScraper extends scrap.CheerioScraper {

    constructor(name:string) {
        super(name);
        this.xmlMode = true;
    }

    getUrl(scraperParam?:string): string {
        return "https://gensokyoradio.net/xml/";
    }

    public parseCheerio($:any, callback:(err, newNowPlayingSong:song.Song, justScrobbledSong?:song.Song) => void):void {
        var titleElem = $('GENSOKYORADIODATA SONGINFO TITLE');
        var artistElem = $('GENSOKYORADIODATA SONGINFO ARTIST');

        if (titleElem.length < 1 || artistElem.length < 1) {
            callback(null, { Artist: null, Track: null }, null);
            return;
        }


        var track = titleElem.eq(0).text().trim();
        var artist = artistElem.eq(0).text().trim();

        callback(null, { Artist: artist, Track: track }, null);
    }
}