/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class Andys80sScraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.andys80s.com/playing.html";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		// html is malformed, just get all TRs, find the one with a TD that says "Currently Playing", and use the next row
		var target = -1;
		var songText = '';
		$('tr').each(function(i, elem) {
			var tds = $(this).children('td');
			if (i == target) {
				if (tds.length >= 1) {
					songText = tds.eq(0).text().trim();
				}
				return;
			}

			if (tds.length >= 1) {
				if (tds.eq(0).text().trim().toLowerCase() == 'currently playing') {
					target = i + 1;
				}
			}
		});

		songText = songText.trim();
		if (!songText) {
			winston.info("Andys80sScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		// This will probably break for some artists
		var separator = songText.indexOf(" - ");
		if (separator < 0) {
			winston.info("Andys80sScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artistText = songText.substring(0, separator).trim();
		var songText = songText.substring(separator+3).trim();

		if (!artistText || !songText) {
			winston.info("Andys80sScraper could not find song");
			callback(null, { Artist: null, Track: null });
			return;
		}
		else {
			winston.info("Andys80sScraper found song " + artistText + " - " + songText);
			callback(null, { Artist: artistText, Track: songText });
			return;
		}
	}
}