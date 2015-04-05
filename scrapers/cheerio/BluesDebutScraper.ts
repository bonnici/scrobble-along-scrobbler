/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class BluesDebutScraper extends scrap.CheerioScraper {

    constructor(name:string) {
        super(name);
    }

    public getUrl(): string {
        return "http://streamdb4web.securenetsystems.net/player_status_update/BLUSDBUT.xml?randStr=" + Math.random();
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var artistElem = $('playlist artist');
        var titleElem = $('playlist title');

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