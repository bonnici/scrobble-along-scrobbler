/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class Kiis1065Scraper extends scrap.JsonScraper {
    private baseUrl:string;

    constructor(name:string) {
        super(name);
        this.baseUrl = "http://www.kiis1065.com.au/umbraco/Arn/ArnFeed/GetOnAir?feedUrl=http://media.arn.com.au/xml/mix1065_now.xml";
    }

    getUrl(lastfmUsername?:string): string {
        return this.baseUrl;
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var artist = jsonData.NowPlaying.Artist;
        
        if (artist !== "KIIS1065") {
            return {Artist: artist, Track: jsonData.NowPlaying.Title};
        }
        return {Artist: null, Track: null};
    }
}