/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("Scraper");
import song = require("../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class CheerioScraper extends scrap.Scraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		throw "Abstract Class";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		throw "Abstract Class";
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void, scraperParam?:string): void {
		this.fetchUrl(this.getUrl(), (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}

			if (!body) {
				winston.warn("CheerioScraper: No HTML body");
				callback(null, { Artist: null, Track: null });
				return;
			}

			var $ = cheerio.load(body);
			this.parseCheerio($, callback);
		});
	}
}