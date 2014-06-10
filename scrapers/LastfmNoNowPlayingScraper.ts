/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../Song");
import jsonScrap = require("JsonScraper");

import winston = require("winston");

export class LastfmNoNowPlayingScraper extends jsonScrap.JsonScraper {
	// Only return songs as just played if they were scrobbled less than 5 minutes ago
	// The scrobbler will only scrobble once since it doesn't scrobble the same song twice in a row
	private MAX_SCROBBLED_TIME:number = 5*60*1000;

	constructor(name:string, private apiKey:string) {
		super(name);
	}

	getUrl(lastfmUsername?:string): string {
		if (!lastfmUsername) {
			throw "lastfmUsername is required";
		}

		return "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUsername + "&api_key=" +
			this.apiKey + "&limit=1&format=json"
	}

	extractJustPlayedSong(jsonData:any): song.Song {
		var track = jsonData['recenttracks']['track'];

		if (!track["artist"]) {
			track = track[0];
		}

		var scrobbledTime = parseInt(track['date']['uts']) * 1000;
		var timeNow = new Date().getTime();

		if (scrobbledTime && timeNow && (timeNow - scrobbledTime < this.MAX_SCROBBLED_TIME)) {
			return { Artist: track['artist']['#text'], Track: track['name'] };
		}

		return { Artist: null, Track: null };
	}
}