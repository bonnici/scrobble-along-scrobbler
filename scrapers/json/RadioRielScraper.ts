/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class RadioRielScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(username?:string): string {
        if (!username) {
            throw "username is required";
        }

        return "http://music.slserver.com:2199/external/rpc.php?m=streaminfo.get&username=" + username +
            "&charset=&mountpoint=&rid=" + username + "&_=" + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    }
}