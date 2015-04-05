/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import _ = require("underscore");
import winston = require("winston");

export class AllSongs247Scraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(lastfmUsername?:string): string {
        return "http://www.npr.org/templates/music/data/GetLatestPlayingSong.php?streamId=129729686";
    }

    extractNowPlayingSong(jsonData:any):song.Song {
        return {Artist: jsonData.artist, Track: jsonData.title};
    }
}