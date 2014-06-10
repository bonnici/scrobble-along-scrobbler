/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class JjjScraper extends scrap.CheerioScraper {
	private baseUrl: string;

	constructor(name:string, baseUrl?: string) {
		super(name);
		this.baseUrl = baseUrl || "http://www.abc.net.au/triplej/feeds/playout/triplej_sydney_playout.xml";
	}

	public getUrl(): string {
		return this.baseUrl;
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var nowPlayingItem = $.root().find('item').first();
		var playingTime: any = nowPlayingItem.find('playing');

		if (playingTime.length > 0 && playingTime.first().text().toLowerCase() == "now") {
			var artists: any = nowPlayingItem.find('artistname');
			var tracks: any = nowPlayingItem.find('title');

			if (artists.length > 0 && tracks.length > 0) {
				var artist = artists.first().text();
				var track = tracks.first().text();

				if (artist && track) {
					winston.info("JjjScraper found song " + artist + " - " + track);
					callback(null, { Artist: artist, Track: track });
					return;
				}
			}
		}

		winston.info("JjjScraper could not find song");
		callback(null, { Artist: null, Track: null });
	}
}