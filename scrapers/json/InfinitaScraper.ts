/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class InfinitaScraper extends jsonScrap.JsonScraper {

	constructor(name:string) {
		super(name);
	}

	getUrl(scraperParam?:string): string {
		return "http://vivo.infinita.cl/json/last.json?_=" + new Date().getTime();
	}

	preprocessBody(body: string):string {
		//trim jsonp from start "last(" and end ")"
		return body.substring(5, body.length - 1);

	}

	extractNowPlayingSong(jsonData:any): song.Song {
		if (!jsonData || !jsonData.items || jsonData.items.length == 0 || !jsonData.items[0].song) {
			winston.error("InfinitaScraper found invalid json ", jsonData);
			return { Artist: null, Track: null };
		}

		var firstTrack = jsonData.items[0].song;
		var splitDetails = firstTrack.split("|");

		if (splitDetails.length < 2) {
			winston.error("InfinitaScraper found invalid track details ", firstTrack);
			return { Artist: null, Track: null };
		}
		else {
			return {
				Artist: splitDetails[0].trim(),
				Track: splitDetails[1].trim()
			};
		}
	}
}