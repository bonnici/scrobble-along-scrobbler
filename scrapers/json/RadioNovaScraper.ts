/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import song = require("../../Song");
import jsonScrap = require("./JsonScraper");

import cheerio = require("cheerio");
import winston = require("winston");

export class RadioNovaScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://www.novaplanet.com/radionova/ontheair";
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var trackMarkup = jsonData.track.markup;
        var $ = cheerio.load(trackMarkup);
        
        var artist = $('div.artist').text().trim();
        var track = $('div.title').text().trim();
        
        return {
            Artist: artist,
            Track: track
        };
    }
}