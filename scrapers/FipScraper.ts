/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import jsonScrap = require("./JsonScraper");
import song = require("../Song");

import winston = require("winston");

export class FipScraper extends jsonScrap.JsonScraper {

    constructor(name:string) {
        super(name);
    }

    getUrl(scraperParam?:string): string {
        return "http://www.fipradio.fr/sites/default/files/import_si/si_titre_antenne/FIP_player_current.json?_="
            + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        return {
            Artist: this.capitalize(jsonData.current.song.interpreteMorceau),
            Track: this.capitalize(jsonData.current.song.titre)
        };
    }
}