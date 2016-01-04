/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class Radio2NLScraper extends jsonScrap.JsonScraper {

	constructor(name:string) {
		super(name);
	}

	getUrl(scraperParam?:string): string {
        return "http://radiobox2.omroep.nl/data/radiobox2/nowonair/2.json?npo_cc_skip_wall=1";
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return {
			Artist: jsonData.results[0].songfile.artist.trim(),
			Track: jsonData.results[0].songfile.title.trim()
		};
	}
}