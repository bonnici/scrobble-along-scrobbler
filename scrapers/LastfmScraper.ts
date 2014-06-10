/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../Song");
import jsonScrap = require("JsonScraper");

import winston = require("winston");

export class LastfmScraper extends jsonScrap.JsonScraper {

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

	extractNowPlayingSong(jsonData:any): song.Song {
		var track = jsonData['recenttracks']['track'];

		if (!track["artist"]) {
			track = track[0];
		}

		if (track["@attr"] && track["@attr"]["nowplaying"] == "true") {
			return { Artist: track['artist']['#text'], Track: track['name'] };
		}

		return { Artist: null, Track: null };
	}
}