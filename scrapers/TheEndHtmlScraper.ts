/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class TheEndHtmlScraper extends scrap.CheerioScraper {
	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://kndd.tunegenie.com/?framed=1";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var songElements = $('ul.currentonair li');

		if (songElements.length < 1) {
			winston.warn("TheEndHtmlScraper: songElements is not big enough");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var songDiv = songElements.eq(0).find('div.song');

		if (!songDiv || songDiv.length < 1) {
			winston.warn("TheEndHtmlScraper: couldn't find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artistDiv = songElements.eq(0).find('div.song').eq(0).next('div');
		if (!artistDiv || artistDiv.length < 1) {
			winston.warn("TheEndHtmlScraper: couldn't find artist");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var songText = songDiv.eq(0).text();
		var artistText = artistDiv.eq(0).text();

		if (!songText || !songText.trim() || !artistText || !artistText.trim()) {
			winston.warn("TheEndHtmlScraper: empty song or artist");
			callback(null, { Artist: null, Track: null });
			return;
		}

		callback(null, { Artist: artistText.trim(), Track: songText.trim() });
	}
}