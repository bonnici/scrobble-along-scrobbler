/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../Song");
import jsonScrap = require("JsonScraper");

import winston = require("winston");

export class Radio2NLScraper extends jsonScrap.JsonScraper {

	constructor(name:string) {
		super(name);
	}

	getUrl(scraperParam?:string): string {
		return "http://www.radio2.nl/block/header/currentsong.json";
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return {
			Artist: jsonData.data.songfile.artist.trim(),
			Track: jsonData.data.songfile.title.trim()
		};
	}
}