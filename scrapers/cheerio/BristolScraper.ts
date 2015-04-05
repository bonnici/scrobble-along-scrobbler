/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");
import moment = require("moment-timezone");

export class BristolScraper extends scrap.CheerioScraper {

    constructor(name:string) {
        super(name);
    }

    public getUrl(): string {
        return "http://api.radionomy.com/currentsong.cfm?radiouid=f9d055a4-0ce8-4f45-a401-28aed720b2d2&type=xml&cachbuster=" +
            new Date().getTime();
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var title = $('title').first().text().trim();
        var artist = $('artists').first().text().trim();

        if (title && artist) {
            callback(null, { Artist: artist, Track: title });
        } else {
            callback(null, { Artist: null, Track: null });
        }
    }
}