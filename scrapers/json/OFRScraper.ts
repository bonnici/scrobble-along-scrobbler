/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class OFRScraper extends jsonScrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(stationId?:string): string {
        return "https://ofr.fm/api/v1/live/" + stationId + "?_=" +
            new Date().getTime();
    }
    
    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.now_playing.artist, Track: jsonData.now_playing.title };
    }
}