/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import _ = require("underscore");
import winston = require("winston");

export class WWOZScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(lastfmUsername?:string): string {
        return "https://www.wwoz.org/api/tracks/current";
    }

    extractNowPlayingSong(jsonData:any):song.Song {
        return {Artist: jsonData.ArtistName, Track: jsonData.SongName};
    }
}