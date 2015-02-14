/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../Song");

import _ = require("underscore");
import winston = require("winston");

export class FarPastPostScraper extends scrap.JsonScraper {
    private url: string;

    constructor(name:string) {
        super(name);
        this.url = "http://192.99.34.205/external/rpc.php?m=streaminfo.get&username=farpastp&charset=&mountpoint=&rid=farpastp&_="
            + new Date().getTime();
    }

    getUrl(lastfmUsername?:string): string {
        return this.url;
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    }
}