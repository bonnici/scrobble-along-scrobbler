/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

//import scrap = require("Scraper");
import jsonScrap = require("JsonScraper");
import song = require("../Song");

import winston = require("winston");

/*
export class InfinitaScraper extends scrap.Scraper {
	private url: string;

	constructor(name:string) {
		super(name);
		this.url = "http://www.infinita.cl/datas/ahora.xml";
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		this.fetchUrl(this.url, (err, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			this.parseHtml(body, callback);
		});
	}

	private parseHtml(body: string, callback: (err, song:song.Song) => void): void {
		if (!body) {
			winston.warn("InfinitaScraper: No HTML body");
			callback(null, { Artist: null, Track: null });
			return;
		}

		// Cheerio not working, use regex
		var artistPattern = /<interprete><!\[CDATA\[(.*?)]]><\/interprete>/;
		var artistMatches = artistPattern.exec(body);
		var titlePattern = /<nombre><!\[CDATA\[(.*?)]]><\/nombre>/;
		var titleMatches = titlePattern.exec(body);

		if (!artistMatches || artistMatches.length == 0 || !titleMatches || titleMatches.length ==0) {
			callback(null, { Artist: null, Track: null });
			return;
		}
		var artistData = artistMatches[1];
		var songData = titleMatches[1];

		//var $ = cheerio.load(body);

		//var artistData = $('interprete').text();
		//var songData = $('nombre').text();

		if (!artistData || !songData) {
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artistName = artistData.trim();
		var songName = songData.trim();

		if (!artistName || !songName) {
			callback(null, { Artist: null, Track: null });
		} else {
			callback(null, { Artist: artistName, Track: songName });
		}
	}
}
*/


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
		if (!jsonData || !jsonData.items || !jsonData.items.length > 0 || !jsonData.items[0].song) {
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