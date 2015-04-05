/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../../Song");

import winston = require("winston");

export class CoreOfDestructionScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://apps.streamlicensing.com/snippet.cgi?sid=2208&rand_" + this.generateRandomNumber() + "="
            + this.generateRandomNumber();
    }

    generateRandomNumber(): string {
        var result = "";
        for (var i=0; i < 5; i++) {
            result += Math.ceil(Math.random() * 10);
        }
        return result;
    }

    preprocessBody(body: string):string {
        //simple regex to extract json body
        var matches = body.match(/{.*}/);
        return matches.length > 0 ? matches[0] : body;
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var track = jsonData.song;
        var splitDetails = track.split(" - ");

        if (splitDetails.length < 2) {
            winston.error("CoreOfDestructionScraper found invalid track details ", splitDetails);
            return { Artist: null, Track: null };
        }
        else {
            return {
                Artist: splitDetails[0].trim(),
                Track: splitDetails[1].trim()
            };
        }
    }
}