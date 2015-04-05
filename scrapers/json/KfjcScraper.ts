/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class KfjcScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(lastfmUsername?:string):string {
        return "http://kfjc.org/api/playlists/current.php?_=" + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any):song.Song {
        return {Artist: jsonData.artist, Track: jsonData.track_title};
    }
}