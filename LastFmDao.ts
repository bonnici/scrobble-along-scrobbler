/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../definitions/dummy-definitions/lastfm.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import s = require("./Song");

import _ = require("underscore")
import lastfm = require("lastfm")
import winston = require("winston");

export interface LastFmDao {
	postNowPlaying(song:s.Song, lastFmUsername:string, session:string, callback?:(err, status)=>void): void;
	scrobble(song:s.Song, lastFmUsername:string, session:string, callback?:(err, status)=>void): void;
}

export class DummyLastFmDao implements LastFmDao {
	postNowPlaying(song:s.Song, lastFmUsername:string, session:string, callback?:(err, status)=>void): void {
		callback = callback || (() => {});

		if (song.Artist && song.Track) {
			winston.info("Faking post now playing to user " + lastFmUsername + ", session " + session + " of song:", song);
			callback(null, "OK");
		}
		else {
			callback("Invalid song", null);
		}
	}

	scrobble(song:s.Song, lastFmUsername:string, session:string, callback?:(err, status)=>void): void {
		callback = callback || (() => {});

		if (song.Artist && song.Track) {
			winston.info("Faking scrobble to user " + lastFmUsername + ", session " + session + " of song:", song);
			callback(null, "OK");
		}
		else {
			callback("Invalid song", null);
		}
	}
}

export class LastFmDaoImpl implements LastFmDao {
	private POST_NOW_PLAYING_DURATION = 40; // in seconds

	constructor(private lastfmNode: lastfm.LastFmNode) {}

	postNowPlaying(song:s.Song, lastFmUsername:string, sessionKey:string, callback?:(err, status)=>void): void {
		callback = callback || (() => {});

		if (!song || !song.Artist || !song.Track || !lastFmUsername || !sessionKey) {
			winston.error("postNowPlaying invalid parameters:", { song: song, lastFmUsername:lastFmUsername, sessionKey:sessionKey });
			callback("Invalid parameters", null);
			return;
		}

		var updateOptions = {
			artist: song.Artist,
			track: song.Track,
			duration: this.POST_NOW_PLAYING_DURATION,
			handlers: {
				success: function (data) {
					winston.info("Success posting now playing for " + lastFmUsername, song);
					callback(null, "OK");
				},
				error: function (error) {
					winston.error("Error posting now playing for " + lastFmUsername, error.message);
					callback(error, null);
				}
			}
		};

		var session = this.lastfmNode.session(lastFmUsername, sessionKey);
		this.lastfmNode.update('nowplaying', session, updateOptions);
	}
	
	scrobble(song:s.Song, lastFmUsername: string, sessionKey:string, callback?:(err, status)=>void) {
		callback = callback || (() => {});

		if (!song || !song.Artist || !song.Track || !lastFmUsername || !sessionKey) {
			winston.error("scrobble invalid parameters:", { song: song, lastFmUsername:lastFmUsername, sessionKey:sessionKey });
			callback("Invalid parameters", null);
			return;
		}

		var updateOptions = {
			artist: song.Artist,
			track: song.Track,
			timestamp: Math.round(song.StartTime / 1000),
			handlers: {
				success: function (data) {
					winston.info("Success posting scrobble for " + lastFmUsername, song);
					callback(null, "OK");
				},
				error: function (error) {
					winston.error("Error posting scrobble for " + lastFmUsername, error.message);
					callback(error, null);
				}
			}
		};
		
		var session = this.lastfmNode.session(lastFmUsername, sessionKey);
		this.lastfmNode.update('scrobble', session, updateOptions);
	}
}