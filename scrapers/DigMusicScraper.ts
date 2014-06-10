/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("JsonScraper");
import song = require("../Song");

import _ = require("underscore");
import winston = require("winston");

export class DigMusicScraper extends scrap.JsonScraper {
	private url: string;

	constructor(name:string, baseUrl?: string) {
		super(name);
		this.url = baseUrl || "http://digmusic.net.au/player-data.php";
	}

	getUrl(lastfmUsername?:string): string {
		return this.url;
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		var artistName: string = null;
		var title: string = null;
		_.each(jsonData, function (element: any) {
			if (element && element.playing == 'now') {
				artistName = element.artistName;
				title = element.title;
			}
		});

		if (!artistName || !title) {
			winston.info("DigMusicScraper could not find song");
			return { Artist: null, Track: null };
		}
		else {
			winston.info("DigMusicScraper found song " + artistName + " - " + title);
			return { Artist: artistName, Track: title };
		}
	}
}