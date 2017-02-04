/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class NewKexpScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://legacy-api.kexp.org/play/?limit=1";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        if (jsonData.results[0].playtype.playtypeid != 1) {
            return {
                Artist: null,
                Track: null
            };
        } else {
            return {
                Artist: jsonData.results[0].artist.name,
                Track: jsonData.results[0].track.name
            };
        }
    }
}