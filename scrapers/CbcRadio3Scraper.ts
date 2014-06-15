/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");
import moment = require("moment-timezone");

export class CbcRadio3Scraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		var now = moment().tz("America/New_York");
		return "http://music.cbc.ca/radio3broadcastlogs/radio3broadcastlogs.aspx?broadcastdate=" + now.format("YYYY-MM-DD");
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var lastEntry = $('div.logEntryInfo').last();
		if (!lastEntry) {
			winston.warn("CbcRadio3Scraper: Could not find last entry");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var splitInfo = lastEntry.text().trim().split("\n");

		if (splitInfo.length != 2) {
			winston.warn("CbcRadio3Scraper: Invalid entry info", splitInfo);
			callback(null, { Artist: null, Track: null });
		}
		else {
			callback(null, { Artist: splitInfo[0].trim(), Track: splitInfo[1].trim() });
		}
	}
}