/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class SomaScraper extends scrap.CheerioScraper {
	private url: string;

	constructor(name:string, station: string) {
		super(name);
		this.url = "http://somafm.com/" + station + "/songhistory.html";
	}

	public getUrl(): string {
		return this.url;
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var playlistRows = $('#playinc table tr');

		if (playlistRows.length < 2) {
			winston.warn("SomaScraper: Not enough playlist rows (" + playlistRows.length + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var firstSongRow = playlistRows.eq(2);

		if (firstSongRow.children("td").length < 3) {
			winston.warn("SomaScraper: Not enough playlist cols (" + firstSongRow.children("td").length + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var time = firstSongRow.children("td").first().text();
		var artist = firstSongRow.children("td").eq(1).text();
		var song = firstSongRow.children("td").eq(2).text();

		if (!time || time == '' || !artist || artist == '' || !song || song == '') {
			winston.warn("SomaScraper: Invalid cols (" + time + "/" + artist + "/" + song + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		if (time.toLowerCase().indexOf("(now)") == -1) {
			winston.info("SomaScraper did not find a currently playing song");
			callback(null, { Artist: null, Track: null });
		}
		else {
			winston.info("SomaScraper found song " + artist + " - " + song);
			callback(null, { Artist: artist, Track: song });
		}
	}
}