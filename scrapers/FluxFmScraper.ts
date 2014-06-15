/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../Song");
import jsonScrap = require("JsonScraper");

import winston = require("winston");

export class FluxFmScraper extends jsonScrap.JsonScraper {

	constructor(name:string) {
		super(name);
	}

	getUrl(scraperParam?:string): string {
		return "http://www.fluxfm.de/fluxfm-playlist/api.php?act=list&cuttime=1&limit=1&loc=berlin";
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return {
			Artist: jsonData.tracks[0].artist.trim(),
			Track: jsonData.tracks[0].title.trim()
		};
	}
}