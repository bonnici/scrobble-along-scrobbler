/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("Scraper");
import song = require("../Song");

import winston = require("winston");

export class HollowEarthScraper extends scrap.Scraper {
	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://www.boontdusties.com/specialhollow/yql.php";
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var timestampedUrl = this.url + "?_=" + new Date().getTime();
		this.fetchUrl(timestampedUrl, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseHtml(body, callback);
		});
	}

	private parseHtml(body: string, callback: (err, song:song.Song) => void): void {
		body = body.replace("\\", "");
		var split = body.split("<br/>");

		if (split.length <= 1) {
			winston.info("HollowEarthScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var currentSong = split[1];
		var currentSongSplit = currentSong.split(" - ");

		if (currentSongSplit.length >= 2) {
			winston.info("HollowEarthScraper found song " + currentSongSplit[0] + " - " + currentSongSplit[1]);
			callback(null, { Artist: currentSongSplit[0], Track: currentSongSplit[1] });
			return;
		}
		winston.info("HollowEarthScraper could not find song");
		callback(null, { Artist: null, Track: null });
	}
}