/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class XrayScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(lastfmUsername?:string): string {
        return "http://xray.fm/api/tracks/current";
    }

    extractNowPlayingSong(jsonData:any):song.Song {
        return {Artist: jsonData.artist, Track: jsonData.title};
    }
}