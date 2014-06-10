/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import moment = require('moment-timezone');
import util = require("util");
import winston = require("winston");

export class KexpScraper extends scrap.CheerioScraper {
	public defaultStartTime: string = null; // Overridable for tests
	private baseUrl: string;

	constructor(name:string, baseUrl?: string) {
		super(name);
		this.baseUrl = baseUrl || "http://kexp.org/playlist/playlistupdates?channel=1&start=%s&since=%s";
	}

	// Separated so that it is mockable
	private startTime(): string {
		return this.defaultStartTime ||
			moment().tz("America/Los_Angeles").subtract('minutes', 30).format("YYYY-MM-DDTHH:mm:ss.SSS");
	}

	public getUrl(): string {
		return util.format(this.baseUrl, this.startTime(), this.startTime());
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var nowPlayingDiv:any = $.root().children('div').first();

		// Check for airbreak
		if (nowPlayingDiv.hasClass("AirBreak")) {
			winston.info("KexpScraper found an air break");
			callback(null, { Artist: null, Track: null });
			return;
		}
		else if (nowPlayingDiv.hasClass("Play")) {
			var artist = nowPlayingDiv.find("div.ArtistName").text();
			var track = nowPlayingDiv.find("div.TrackName").text();

			if (artist && track) {
				winston.info("KexpScraper found song " + artist + " - " + track);
				callback(null, { Artist: artist, Track: track });
				return;
			}
		}

		winston.info("KexpScraper could not find a song");
		callback(null, { Artist: null, Track: null });
	}
}