/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../Song");
import scrap = require("Scraper");

import winston = require("winston");

/*
Base class for scrapers that get JSON data. Other JSON scrapers should be migrated to this eventually.
To use, set this.url in the constructor after calling super and implement extractSong.
*/

export class JsonScraper extends scrap.Scraper {
	constructor(name:string) {
		super(name);
	}

	public fetchAndParse(callback:(err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void, scraperParam?:string): void {
		this.fetchUrl(this.getUrl(scraperParam), (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}

			if (!body) {
				winston.warn("JsonScraper: No/invalid body", body);
				callback(null, { Artist: null, Track: null });
				return;
			}

			body = this.preprocessBody(body);

			try {
				var json = JSON.parse(body);
			}
			catch (e) {
				winston.error("Could not parse JSON body", body);
				callback("Could not parse JSON body", null);
				return;
			}

			try {
				var nowPlayingSong = this.extractNowPlayingSong(json);
				var justPlayedSong = this.extractJustPlayedSong(json);
				callback(null, nowPlayingSong, justPlayedSong);
				return;
			}
			catch (err) {
				winston.warn("JsonScraper: Invalid JSON", json);
			}

			callback(null, { Artist: null, Track: null });
		});
	}

	getUrl(scraperParam?:string): string {
		throw "Abstract function";
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return null;
	}

	extractJustPlayedSong(jsonData:any): song.Song {
		return null;
	}

	preprocessBody(body: string):string {
		return body;
	}
}