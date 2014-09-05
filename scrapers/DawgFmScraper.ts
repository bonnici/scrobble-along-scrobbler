/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class DawgFmScraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.dawgfm.com/cidg_fm.xml?_=" + new Date().getTime();
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var artist = $('Artist');
		var title = $('SongTitle');

		if (artist.length < 1 || title.length < 1) {
			winston.warn("DawgFmScraper: No artist or song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artistText = artist.eq(0).text();
		var titleText = title.eq(0).text();

		if (!artistText || !titleText) {
			winston.warn("DawgFmScraper: No artist or song text");
			callback(null, { Artist: null, Track: null });
			return;
		}

		callback(null, { Artist: artistText, Track: titleText });
	}
}