/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class KGSRScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(lastfmUsername?:string): string {
        return "http://api-partner.tagstation.com/nowplaying/SKK3SLOJR4CC";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.Artist, Track: jsonData.SongName };
    }
}