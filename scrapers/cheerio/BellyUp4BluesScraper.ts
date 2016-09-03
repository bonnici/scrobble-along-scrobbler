/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class BellyUp4BluesScraper extends scrap.CheerioScraper {

    constructor(name:string) {
        super(name);
    }

    public getUrl(): string {
        return "http://apps.streamlicensing.com/covers_widget.cgi?sid=3382&output=1";
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var artistElem = $('span#artist0');
        var titleElem = $('span#title0');

        var artist = artistElem.text();
        var title = titleElem.text();

        if (artist.trim() && title.trim()) {
            callback(null, { Artist: artist.trim(), Track: title.trim() });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    }
}