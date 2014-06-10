/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class PlayFmScraper extends scrap.JsonScraper {
	constructor(name:string) {
		super(name);
	}

	getUrl(lastfmUsername?:string): string {
		return "http://nowplaying.playfm.cl/api/station/4f47e1a2ee909d6c7b0001db/nowplaying";
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return { Artist: jsonData.data.artist.name, Track: jsonData.data.song.title };
	}
}