/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class LastfmNoNowPlayingScraper extends jsonScrap.JsonScraper {
	// Only return songs as just played if they were scrobbled less than 20 minutes ago
	// The scrobbler will only scrobble once since it doesn't scrobble the same song twice in a row
	private MAX_SCROBBLED_TIME:number = 20*60*1000;

	constructor(name:string, private apiKey:string) {
		super(name);
	}

	getUrl(lastfmUsername?:string): string {
		if (!lastfmUsername) {
			throw "lastfmUsername is required";
		}

		return "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmUsername + "&api_key=" +
			this.apiKey + "&limit=2&format=json"
	}

	extractJustPlayedSong(jsonData:any): song.Song {
        var tracks = jsonData['recenttracks']['track'];

        var track = tracks[0];

        if (track["@attr"] && track["@attr"]["nowplaying"] == "true") {
            if (tracks.length == 0) {
                return { Artist: null, Track: null };
            }
            track = tracks[1];
        }

		var scrobbledTime = parseInt(track['date']['uts']) * 1000;
		var timeNow = new Date().getTime();

		if (scrobbledTime && timeNow && (timeNow - scrobbledTime < this.MAX_SCROBBLED_TIME)) {
			return { Artist: track['artist']['#text'], Track: track['name'] };
		}

		return { Artist: null, Track: null };
	}
}