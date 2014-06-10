/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class GoldRadioScraper extends scrap.CheerioScraper {
	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.mygoldmusic.co.uk/jsfiles/NowPlayingDisplay.aspx?f=http%3A%2F%2Frope%2Eicgo%2Efimc%2Enet%2FFeeds%2FNowPlaying%2FGCap%5FMedia%2FGold%5FNetwork%2FGold%5FLondon%2F5853%2Exml&l=5853&tzc=8";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		/*
		 e.g.
		 <div id="RcsPlayingPrevTitle"></div>
		 <div id="RcsPlayingPrevArtist"></div>
		 <div id="RcsPlayingPrevSong"></div>
		 <div id="RcsPlayingNowTitle">playing now:</div>
		 <div id="RcsPlayingNowArtist">Procul Harum,</div>
		 <div id="RcsPlayingNowSong">A Whiter Shade Of Pale</div>
		 <div id="RcsPlayingNextTitle"></div>
		 <div id="RcsPlayingNextArtist"></div>
		 <div id="RcsPlayingNextSong"></div>
		 <div id="RcsNextInSeconds">229</div>
		 */

		var artistDiv = $('div#RcsPlayingNowArtist');
		var songDiv = $('div#RcsPlayingNowSong');

		if (artistDiv.length < 1 || songDiv.length < 1) {
			winston.warn("GoldRadioScraper: No artist or song div", { artistDivLength: artistDiv.length, songDivLength: songDiv.length });
			callback(null, { Artist: null, Track: null });
			return;
		}

		var artistText = artistDiv.eq(0).text();
		var titleText = songDiv.eq(0).text();

		if (!artistText.trim() || !titleText.trim()) {
			winston.warn("GoldRadioScraper: Blank artist or title", { artistText: artistText, titleText: titleText });
			callback(null, { Artist: null, Track: null });
			return;
		}

		// artist includes a trailing comma so substring it out
		artistText = artistText.substring(0, artistText.length-1);

		artistText = artistText.trim();
		titleText = titleText.trim();

		if (artistText && titleText) {
			winston.info("GoldRadioScraper found song " + artistText + " - " + titleText);
			callback(null, { Artist: artistText, Track: titleText });
		}
		else {
			winston.info("GoldRadioScraper could not find song");
			callback(null, { Artist: null, Track: null });
		}
	}
}