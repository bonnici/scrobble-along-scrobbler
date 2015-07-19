/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class SixFortyScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://54.173.171.80:8000/json.xsl?callback=parseMusic&_="
            + new Date().getTime();
    }

    preprocessBody(body: string):string {
        // Strip "parseMusic(" from start and ");" from end
        var trimmed = body.substring(11, body.length - 2);
        return trimmed;
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var title = jsonData['/6forty'].title;
        var split = title.split("-");
        if (split.length > 1) {
            return {
                Artist: split[0].trim(),
                Track: split[1].trim()
            };
        }
        return { Artist: null, Track: null };
    }
}