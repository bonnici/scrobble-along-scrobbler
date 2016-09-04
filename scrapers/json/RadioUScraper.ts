/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class RadioUScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(): string {
        return "http://cc.net2streams.com/external/rpc.php?m=streaminfo.get&username=live&rid=live&_=" + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        if (jsonData.data[0].track.artist === "Unknown") {
            return { Artist: null, Track: null };
        }
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    }
}