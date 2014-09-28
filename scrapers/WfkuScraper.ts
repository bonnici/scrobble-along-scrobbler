/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class WfkuScraper extends scrap.JsonScraper {
	private station: string;
	
	constructor(name:string, station:string) {
		super(name);
		this.station = station;
	}

	getUrl(): string {
		return "http://www.wfku.org/player/recenttracks.php?station=" + this.station + "&_=" + new Date().getTime();
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		var fullName = jsonData.results[0].title;
		var splitName = fullName.split(" - ");
		if (splitName.length >= 2) {
			return { Artist: splitName[0], Track: splitName[1] };
		} else {
			winston.info("WfkuScraper could not find song");
			return { Artist: null, Track: null };
		}
	}
}