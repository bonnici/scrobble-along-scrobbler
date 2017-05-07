/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class RockAxisScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(): string {
        return "http://nowplaying.s-mdstrm.com/cache/nowplaying_4fd129734ec855d42100129c.json";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.data.artist.name, Track: jsonData.data.song.title };
    }
}