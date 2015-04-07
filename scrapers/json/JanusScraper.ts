/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class JanusScraper extends scrap.JsonScraper {
    private baseUrl:string;

    constructor(name:string, urlName:string) {
        super(name);
        this.baseUrl = "http://" + urlName + "-int.janus.cl/app_janus/site/canciones/last.json?_=";
    }

    getUrl(lastfmUsername?:string): string {
        return this.baseUrl + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: this.capitalize(jsonData[0].artistName), Track: this.capitalize(jsonData[0].titleName) };
    }
}