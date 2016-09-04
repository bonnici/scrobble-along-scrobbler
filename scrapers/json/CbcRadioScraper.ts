/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import _ = require("underscore");
import winston = require("winston");
import moment = require("moment-timezone");

export class CbcRadioScraper extends scrap.JsonScraper {
    constructor(name:string) {
        super(name);
    }

    getUrl(stationId?:string): string {
        var now = moment().tz("America/Toronto");
        return "http://www.cbcmusic.ca/Component/Playlog/GetPlaylog?stationId=" + stationId + "&date=" + now.format("YYYY-MM-DD") + "&_=" + new Date().getTime();
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var programs = jsonData.programs;
        var lastProgram = programs[programs.length - 1];
        var tracks = lastProgram.Tracks;
        var lastTrack = tracks[tracks.length - 1];

        return { Artist: lastTrack.Artists[0], Track: lastTrack.Title };
    }
}