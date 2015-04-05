/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class Wave965Scraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://np.radioplayer.co.uk/qp/v3/onair?rpIds=501&nameSize=200&artistNameSize=200&descriptionSize=200&_="
            + new Date().getTime();
    }

    preprocessBody(body: string):string {
        // Strip "callback(" from start and ")" from end
        return body.substring(9, body.length - 1);
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        for (var i = 0; i < jsonData.results["501"].length; i++) {
            if (jsonData.results["501"][i].type == "PE_E") {
                return {
                    Artist: jsonData.results["501"][i].artistName,
                    Track: jsonData.results["501"][i].name
                };
            }
        }
        return { Artist: null, Track: null };
    }
}