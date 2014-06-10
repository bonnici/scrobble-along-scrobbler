/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class KcqnScraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.kcqnutah.com/tmp/testFile.txt?" + new Date().getTime();
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		/*
		 e.g.
		 <p class="textnormal"> 11:19 am</p><p class="songtitle"> Misfit <span class="songartist"> Curiousity Killed The Cat </span></p><span class="pasthoursongs"><a href="http://www.kcqnutah.com/?action=past_hour">[ See the last hour of songs ]</a></span>
		 */

		var songtitleParagraph = $('p.songtitle');
		var artistSpan = $('p.songtitle span.songartist');

		if (songtitleParagraph.length < 1 || artistSpan.length < 1) {
			winston.warn("KcqnScraper: No songtitle paragraph or artist span", { songtitleParagraphLength: songtitleParagraph.length, artistSpanLength: artistSpan.length });
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artistText = artistSpan.eq(0).text();
		var titleText = songtitleParagraph.eq(0).text();

		if (!artistText.trim() || !titleText.trim()) {
			winston.warn("KcqnScraper: Blank artist or title", { artistText: artistText, titleText: titleText });
			callback(null, { Artist: null, Track: null });
			return;
		}

		// title includes artist, so substring it out
		titleText = titleText.substring(0, titleText.length - artistText.length);

		artistText = artistText.trim();
		titleText = titleText.trim();

		if (artistText && titleText) {
			winston.info("KcqnScraper found song " + artistText + " - " + titleText);
			callback(null, { Artist: artistText, Track: titleText });
		}
		else {
			winston.info("KcqnScraper could not find song");
			callback(null, { Artist: null, Track: null });
		}
	}
}