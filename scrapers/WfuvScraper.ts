/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("Scraper");
import song = require("../Song");

import winston = require("winston");

export class WfuvScraper extends scrap.Scraper {
	private url: string;
	private jsonName: string;

	constructor(name: string, jsonName:string) {
		super(name);
		this.url = "http://nowplaying.wfuv.org/playlistinfo2.php";
		this.jsonName = jsonName;
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		this.fetchUrl(this.url, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseJson(body, callback);
		});
	}

	private parseJson(body: string, callback: (err, song:song.Song) => void): void {
		if (!body || body.length < 14) {
			winston.warn("WfuvScraper: No/invalid body", body);
			callback(null, { Artist: null, Track: null });
			return;
		}

		body = body.trim().substring(12, body.length - 2);

		try {
			var json = JSON.parse(body);
		}
		catch (e) {
			winston.error("Could not parse JSON body", body);
			callback("Could not parse JSON body", null);
			return;
		}

		if (!json || !json[this.jsonName]) {
			winston.warn("WfuvScraper: Invalid JSON", json);
			callback(null, { Artist: null, Track: null });
			return;
		}

		if (!json[this.jsonName].artist || !json[this.jsonName].title) {
			winston.info("WfuvScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artist = json[this.jsonName].artist.trim();
		var title = json[this.jsonName].title.trim();

		if (!artist || !title) {
			winston.info("WfuvScraper could not find song");
			callback(null, { Artist: null, Track: null });
		}
		else {
			winston.info("WfuvScraper found song " + artist + " - " + title);
			callback(null, { Artist: artist, Track: title });
		}
	}
}