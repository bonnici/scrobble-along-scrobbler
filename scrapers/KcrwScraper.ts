/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class KcrwScraper extends scrap.JsonScraper {
	constructor(name:string) {
		super(name);
	}

	getUrl(lastfmUsername?:string):string {
		return "http://tracklist-api.kcrw.com/Simulcast";
	}

	extractNowPlayingSong(jsonData:any):song.Song {
		return {Artist: jsonData.artist, Track: jsonData.title};
	}
}