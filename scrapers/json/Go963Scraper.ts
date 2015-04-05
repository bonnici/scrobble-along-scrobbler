/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class Go963Scraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://core.commotion.com/B7F19079-E958-48ED-8C90-E879D3D0B314/nowplaying/songs?since=now&count=1&_="
            + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return {
            Artist: jsonData.songs[0].songartist,
            Track: jsonData.songs[0].songtitle
        };
    }
}