/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class PunkFmScraper extends scrap.JsonScraper {
	constructor(name:string) {
		super(name);
	}

	getUrl(): string {
		return "http://centovacast.galaxywebsolutions.com/external/rpc.php?m=streaminfo.get&username=punkfm&charset=&mountpoint=&rid=punkfm&_="
			+ new Date().getTime();
	}

	extractNowPlayingSong(jsonData:any): song.Song {
		return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
	}
}