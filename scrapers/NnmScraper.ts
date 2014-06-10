/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../Song");
import scrap = require("Scraper");

import _ = require("underscore");
import cheerio = require("cheerio");
import moment = require('moment');
import util = require("util");
import winston = require("winston");

export class NnmScraper extends scrap.Scraper {
	private artistFilter = ['tobi.', 'nnm', 'discojingles', 'connection timed out', 'tunein', 'beer magazine', 'cc wifi radio', 'www.vinja.tv'];
	private artistContainsFilter = ['new normal music', '818.52.radio'];
	private jsonUrl1: string;
	private jsonUrl2: string;
	private marciUrl: string;
	public defaultStartTime: string = null; // Overridable for tests

	constructor(name:string, marciUrl?: string, jsonUrl1?: string, jsonUrl2?: string) {
		super(name);
		this.marciUrl = marciUrl || "http://marci228.getmarci.com/";
		this.jsonUrl1 = jsonUrl1 || "http://p1.radiocdn.com/player.php?hash=69d494aa557d8028daf3100b0538f48e48c53925&action=getCurrentData&_=%s";
		this.jsonUrl2 = jsonUrl2 || "http://p2.radiocdn.com/player.php?hash=69d494aa557d8028daf3100b0538f48e48c53925&action=getCurrentData&_=%s";
	}

	public fetchAndParse(callback:(err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		// First try the marci URL (which contains full track/artist names
		this.tryParseMarci(this.marciUrl, (err, marciSong) => {
			if (!err) {
				winston.info("NnmScraper found song from Marci", marciSong);
				callback(null, marciSong);
				return;
			}

			// Try each json URL if the marci URL fails
			var fullUrl1 = util.format(this.jsonUrl1, this.startTime());
			this.tryParseJson(fullUrl1, (err, jsonSong1) => {
				if (!err) {
					winston.info("NnmScraper found song from JSON URL 1", jsonSong1);
					callback(null, jsonSong1);
					return;
				}

				var fullUrl2 = util.format(this.jsonUrl2, this.startTime());
				this.tryParseJson(fullUrl2, (err, jsonSong2) => {
					if (!err) {
						winston.info("NnmScraper found song from JSON URL 2", jsonSong2);
						callback(null, jsonSong2);
						return;
					}
					winston.info("NnmScraper could not find song");
					callback(err, null);
					return;
				});
			});
		});
	}

	// Separated so that it is mockable
	private startTime(): string {
		return this.defaultStartTime || (moment().unix()*1000).toString();
	}

	private tryParseJson(url: string, callback: (err, song:song.Song) => void): void {
		this.fetchUrl(url, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseJson(body, callback);
		});
	}

	private parseJson(body: string, callback: (err, song:song.Song) => void): void {
		if (!body) {
			callback(null, { Artist: null, Track: null });
			return;
		}

		try {
			var json = JSON.parse(body);
		}
		catch (e) {
			winston.error("Could not parse JSON body", body);
			callback("Could not parse JSON body", null);
			return;
		}

		if (json && json.artist && json.track) {
			if (this.artistFiltered(json.artist)) {
				callback(null, { Artist: null, Track: null });
				return;
			}
			else {
				callback(null, { Artist: json.artist, Track: json.track });
				return;
			}
		}
		else {
			callback(null, { Artist: null, Track: null });
			return;
		}
	}

	private tryParseMarci(url: string, callback: (err, song:song.Song) => void): void {
		this.fetchUrl(url, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseMarci(body, callback);
		});
	}

	private parseMarci(body: string, callback: (err, song:song.Song) => void): void {
		if (!body) {
			callback("Blank marci", null);
			return;
		}

		var $ = cheerio.load(body);
		var block1:any = $('#block1').first();
		var letterbox1:any = block1.children('#letterbox1').first();
		if (!letterbox1 || letterbox1.length == 0) {
			callback("Could not parse marci", null);
			return;
		}

		var onAir = block1.children('.on-air');
		if (!onAir || onAir.length == 0) {
			callback(null, { Artist: null, Track: null });
			return;
		}

		if (letterbox1) {
			var artist = letterbox1.attr("data-artist");
			var track = letterbox1.attr("data-title");

			if (artist && track) {
				if (this.artistFiltered(artist)) {
					callback(null, { Artist: null, Track: null });
					return;
				}
				else {
					callback(null, { Artist: artist, Track: track });
					return;
				}
			}
		}

		callback("Could not parse marci", null);
		return;
	}

	private artistFiltered(artist: string) {
		return _.any(this.artistFilter, (curArtist) => { return curArtist == artist.toLowerCase() }) ||
			_.any(this.artistContainsFilter, (curArtist) => { return artist.toLowerCase().indexOf(curArtist) != -1 })
	}
}