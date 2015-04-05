/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class ChronischScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://api.laut.fm/station/chronisch_elektronisch/current_song";
    }

    /*
    preprocessBody(body: string):string {
        //simple regex to extract json body
        var matches = body.match(/{.*}/);
        return matches.length > 0 ? matches[0] : body;
    }
    */

    extractNowPlayingSong(jsonData:any): song.Song {
        return {
            Artist: jsonData.artist.name.trim(),
            Track: jsonData.title.trim()
        };
    }
}