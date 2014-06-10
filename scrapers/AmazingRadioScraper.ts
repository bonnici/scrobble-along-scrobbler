/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("JsonScraper");
import song = require("../Song");

import _ = require("underscore");
import winston = require("winston");

export class AmazingRadioScraper extends scrap.JsonScraper {
	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://www.amazingtunes.com/radio/history.json";
	}

	getUrl(lastfmUsername?:string): string {
		return this.url;
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		var artistName: string = jsonData[0].tune.artist.display_name;
		var title: string = jsonData[0].tune.title;

		if (!artistName || !title) {
			winston.info("AmazingRadioScraper could not find song");
			return { Artist: null, Track: null };
		}
		else {
			winston.info("AmazingRadioScraper found song " + artistName + " - " + title);
			return { Artist: artistName, Track: title };
		}
	}
}