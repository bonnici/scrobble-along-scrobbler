/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class Los40Scraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(): string {
        return "https://play.los40.com/api/v1/hasonado/get/los40?host=play.los40.com";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData[0].artist, Track: jsonData[0].song };
    }
}