/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class HumanoDerechoScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(): string {
        return `http://142.44.167.189:2199/external/rpc.php?m=streaminfo.get&username=danzig&charset=&mountpoint=&rid=danzig&_=${new Date().getTime()}`;
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    }
}