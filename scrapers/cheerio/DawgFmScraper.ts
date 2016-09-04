/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class DawgFmScraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
        this.xmlMode = true;
	}

	public getUrl(): string {
		return "http://www.dawgfm.com/cidg_fm.xml?_=" + new Date().getTime();
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var entry = $('PlayList Entry');

        if (entry.length < 1) {
            winston.warn("DawgFmScraper: No entry");
            callback(null, { Artist: null, Track: null });
            return;
        }

        callback(null, { Artist: entry.eq(0)[0].attribs.Artist, Track: entry.eq(0)[0].attribs.Title });
	}
}