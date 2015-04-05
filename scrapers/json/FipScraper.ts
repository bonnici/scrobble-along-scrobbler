/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class FipScraper extends jsonScrap.JsonScraper {
    private url: string;

    constructor(name:string, url?: string) {
        super(name);
        this.url = url;
    }

    getUrl(scraperParam?:string): string {
        return this.url + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return {
            Artist: this.capitalize(jsonData.current.song.interpreteMorceau),
            Track: this.capitalize(jsonData.current.song.titre)
        };
    }
}