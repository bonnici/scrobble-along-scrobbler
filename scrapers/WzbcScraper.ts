/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("Scraper");
import song = require("../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class WzbcScraper extends scrap.Scraper {

	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://spinitron.com/public/index.php?station=wzbc";
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var headers = { 'User-Agent': "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1687.2 Safari/537.36" };
		this.fetchUrlWithHeaders(this.url, headers, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseHtml(body, callback);
		});
	}

	private parseHtml(body: string, callback: (err, song:song.Song) => void): void {
		if (!body) {
			winston.warn("WzbcScraper: No HTML body");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var $ = cheerio.load(body);

		var playlistRows = $('div.f2row');

		if (playlistRows.length < 1) {
			winston.info("WzbcScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artist = playlistRows.first().find('span.aw').text();
		var song = playlistRows.first().find('span.sn').text();

		if (!artist || !song) {
			winston.info("WzbcScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		artist = artist.trim();
		song = song.trim().substring(1, song.length - 1).trim();

		if (!artist || !song) {
			winston.info("WzbcScraper could not find song");
			callback(null, { Artist: null, Track: null });
		}
		else {
			winston.info("WzbcScraper found song " + artist + " - " + song);
			callback(null, { Artist: artist, Track: song });
		}
	}
}