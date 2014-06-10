/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/request.d.ts"/>

import song = require("../Song");

import request = require("request");
import winston = require("winston");

// Abstract base class
export class Scraper {

	constructor(public name:string) {}

	// Should call success with a song if it was found, success with null artist/track if no song was found,
	// failure if there was a recoverable error fetching or parsing
	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void, scraperParam?:string): void {
		throw new Error("Abstract");
	}

	// protected
	public fetchUrl(fullUrl: string, callback: (err, body:string) => void): void {
		this.fetchUrlWithHeaders(fullUrl, null, callback);
	}

	// protected
	public fetchUrlWithHeaders(fullUrl: string, headers, callback: (err, body:string) => void): void {
		winston.info("Fetching URL", fullUrl);
		if (headers) {
			winston.info("With headers", headers);
		}
		request({ url: fullUrl, headers: headers || {} }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callback(null, body);
				return;
			}

			if (error) {
				var errorStr = "Error requesting URL " + fullUrl;
				winston.error(errorStr, error);
				callback(errorStr, null);
			}
			else {
				var errorStr = "Bad status code (" + response.statusCode + ") fetching URL " + fullUrl;
				winston.warn(errorStr);
				callback(errorStr, null);
			}
		});
	}
}

export class DummyScraper extends Scraper {
	constructor(public suffix: string) {
		super("Dummy" + suffix);
	}

	public fetchAndParse(callback: (err, song: song.Song) => void): void {
		var songs = [
			{ Artist: "Artist 1 " + this.suffix, Track: "Track 1 " + this.suffix },
			{ Artist: "Artist 2 " + this.suffix, Track: "Track 3 " + this.suffix },
			{ Artist: "Artist 3 " + this.suffix, Track: "Track 3 " + this.suffix }
		];
		var index =  Math.floor(Math.random()*songs.length);
		callback(null, songs[index]);
		return;
	}

}