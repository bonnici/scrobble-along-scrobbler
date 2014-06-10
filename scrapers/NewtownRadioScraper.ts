/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("Scraper");
import song = require("../Song");

import winston = require("winston");

export class NewtownRadioScraper extends scrap.Scraper {
	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://www.live365.com/pls/front?handler=playlist&cmd=view&viewType=xml&handle=fireproofradio&maxEntries=3&tm=";
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var fullUrl = this.url + new Date().getTime();
		this.fetchUrl(fullUrl, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseHtml(body, callback);
		});
	}

	private parseHtml(body: string, callback: (err, song:song.Song) => void): void {
		if (!body) {
			winston.warn("NewtownRadioScraper: No HTML body");
			callback(null, { Artist: null, Track: null });
			return;
		}

		// Cheerio not working, use regex
		var artistPattern = /<Artist>(.*?)<\/Artist>/;
		var artistMatches = artistPattern.exec(body);
		var titlePattern = /<Title>(.*?)<\/Title>/;
		var titleMatches = titlePattern.exec(body);

		if (artistMatches && artistMatches.length > 1 && titleMatches && titleMatches.length > 1) {
			callback(null, {
				Artist: artistMatches[1].trim(),
				Track: titleMatches[1].trim()
			});
		}
		else {
			callback(null, {
				Artist: null,
				Track: null
			});
		}
	}
}