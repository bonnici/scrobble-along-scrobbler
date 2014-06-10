/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class TheEndScraper extends scrap.JsonScraper {
	constructor(name:string) {
		super(name);
	}

	getUrl(): string {
		var baseUrl = "http://kndd.tunegenie.com/w2/pluginhour/since/kndd/";
		var sinceTime = new Date().getTime() - (60 * 60 * 1000); // Get all of last hour's songs
		var timestampedUrl = baseUrl + sinceTime + "/?x=" + new Date().getTime();
		return timestampedUrl;
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		var lastTrack = jsonData.length - 1;

		if (!jsonData[lastTrack].artistName || !jsonData[lastTrack].trackName) {
			winston.warn("TheEndScraper: Invalid last track", {
				trackName: jsonData[lastTrack].trackName,
				artistName: jsonData[lastTrack].artistName
			});
			return { Artist: null, Track: null };
		}

		winston.info("TheEndScraper found song " + jsonData[lastTrack].artistName + " - " + jsonData[lastTrack].trackName);
		return { Artist: jsonData[lastTrack].artistName, Track: jsonData[lastTrack].trackName };
	}
}