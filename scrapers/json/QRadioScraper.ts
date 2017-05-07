/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class QRadioScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(): string {
        return "http://np.radioplayer.co.uk/qp/v3/events?rpId=1350&descriptionSize=200&_="
            + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return { Artist: jsonData.results.now.artistName, Track: jsonData.results.now.name };
    }
}