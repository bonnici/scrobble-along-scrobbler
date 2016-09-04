/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class Los40Scraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(): string {
        return "http://www.yes.fm/a/radio/fm/hasonado/LOS40";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.result[0].artist, Track: jsonData.result[0].track };
    }
}