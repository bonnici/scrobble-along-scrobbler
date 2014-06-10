/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class TheCurrentScraper extends scrap.CheerioScraper {
	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.thecurrent.org/playlist";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var playlistRows = $('li#playlist li div.songDetails');

		if (playlistRows.length < 1) {
			winston.info("TheCurrentScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artist = playlistRows.first().find('h5.artist').text();
		var song = playlistRows.first().find('h5.title').text();

		if (!artist || !song) {
			winston.info("TheCurrentScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		artist = artist.trim();
		song = song.trim();

		if (!artist || !song) {
			winston.info("TheCurrentScraper could not find song");
			callback(null, { Artist: null, Track: null });
		}
		else {
			winston.info("TheCurrentScraper found song " + artist + " - " + song);
			callback(null, { Artist: artist, Track: song });
		}
	}
}