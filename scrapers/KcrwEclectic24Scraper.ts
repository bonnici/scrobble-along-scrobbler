/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class KcrwEclectic24Scraper extends jsonScrap.JsonScraper {
	constructor(name:string) {
		super(name);
	}

	getUrl(lastfmUsername?:string): string {
		return "http://www.kcrw.com/json_song";
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return { Artist: jsonData.artist, Track: jsonData.title };
	}
}