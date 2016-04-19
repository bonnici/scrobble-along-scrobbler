/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import winston = require("winston");

export class MegaStarFmScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://bo.cope.webtv.flumotion.com/api/active?format=json&podId=75";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var details = jsonData.value;

        try {
            var parsedDetails = JSON.parse(details);
        }
        catch (e) {
            winston.error("MegaStarFmScraper could not parse details", parsedDetails);
            return {
                Artist: null,
                Track: null
            };
        }

        return {
            Artist: parsedDetails.author,
            Track: parsedDetails.title
        };
    }
}