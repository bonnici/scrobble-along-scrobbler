/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class CprScraper extends scrap.JsonScraper {
    private baseUrl:string;

    constructor(name:string, urlName:string) {
        super(name);
        this.baseUrl = "http://playlist.cprnetwork.org/api/" + urlName;
    }

    getUrl(lastfmUsername?:string): string {
        return this.baseUrl + "?n=" + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return {
            Artist: jsonData[0].artist,
            Track: jsonData[0].title
        };
    }
}