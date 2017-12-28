/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import _ = require("underscore");
import winston = require("winston");

export class GnlScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(lastfmUsername?:string): string {
        return "https://nowplaying.audiospace.co/296/currentlyPlaying";
    }

    extractNowPlayingSong(jsonData:any):song.Song {
        return {Artist: jsonData.artist, Track: jsonData.song};
    }
}