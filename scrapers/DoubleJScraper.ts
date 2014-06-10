/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("JsonScraper");
import song = require("../Song");

import _ = require("underscore");
import winston = require("winston");

export class DoubleJScraper extends scrap.JsonScraper {
	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://program.abcradio.net.au/api/v1/now_next_previous/doublej.json";
	}

	getUrl(lastfmUsername?:string): string {
		return this.url;
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		var artistName: string = jsonData.now.published_entity.artists[0].name;
		var title: string = jsonData.now.published_entity.title;

		if (!artistName || !title) {
			winston.info("DoubleJScraper could not find song");
			return { Artist: null, Track: null };
		}
		else {
			winston.info("DoubleJScraper found song " + artistName + " - " + title);
			return { Artist: artistName, Track: title };
		}
	}
}