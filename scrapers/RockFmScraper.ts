/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class RockFmScraper extends scrap.CheerioScraper {
	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://www.rockfm.co.uk";
	}

	public getUrl(): string {
		return this.url;
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var nowPlayingSpans = $('#now-playing-track span');

		if (nowPlayingSpans.length < 3) {
			winston.warn("RockFmScraper: Not enough now playing spans (" + nowPlayingSpans.length + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artist = nowPlayingSpans.eq(1).text();
		var song = nowPlayingSpans.eq(2).text();

		if (!artist || !song) {
			winston.warn("RockFmScraper: Invalid artist or song (" + artist + "/" + song + ")");
			callback(null, { Artist: null, Track: null });
		}
		else {
			callback(null, { Artist: artist, Track: song });
		}
	}
}