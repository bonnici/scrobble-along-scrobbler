/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class C895Scraper extends scrap.CheerioScraper {
	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.c895.org/playlist/";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var playlistRows = $('table#playlist tr');

		if (playlistRows.length < 1) {
			winston.warn("C895Scraper: Not enough playlist rows (" + playlistRows.length + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var firstSongRow = playlistRows.eq(1);

		if (firstSongRow.children("td").length < 3) {
			winston.warn("C895Scraper: Not enough playlist cols (" + firstSongRow.children("td").length + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artist = firstSongRow.children("td").eq(1).text();
		var song = firstSongRow.children("td").eq(2).text();

		if (firstSongRow.children("td").length >= 3) {
			var mix = firstSongRow.children("td").eq(3).text();
			if (mix) {
				song += " (" + mix + ")";
			}
		}

		if (!artist || artist == '' || !song || song == '') {
			winston.warn("C895Scraper: Invalid cols (" + artist + "/" + song + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		winston.info("C895Scraper found song " + artist + " - " + song);
		callback(null, { Artist: artist, Track: song });
	}
}