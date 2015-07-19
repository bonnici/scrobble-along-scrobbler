/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./JsonScraper");
import song = require("../../Song");

import _ = require("underscore");
import htmlentities = require("html-entities");
import winston = require("winston");

export class ByteFmJsonScraper extends scrap.JsonScraper {
    private url: string;
    private entities: any;

    constructor(name:string) {
        super(name);
        this.url = "https://www.byte.fm/ajax/song-history/";
        this.entities = new htmlentities.XmlEntities();
    }

    getUrl(lastfmUsername?:string): string {
        return this.url;
    }

    extractNowPlayingSong(jsonData:any): song.Song {
        var track: string = jsonData.tracks[0];

        var re = /<a .*>(.*?)<\/a>/i;
        var found = track.match(re);

        var parsed = found && found.length > 1 ? found[1] : track;

        if (!parsed) {
            return { Artist: null, Track: null };
        }

        var decoded = this.entities.decode(parsed).replace("&ndash;", "-");

        var split = decoded.split("-");

        if (split && split.length > 1) {
            return { Artist: split[0].trim(), Track: split[1].trim() };
        }
        return { Artist: null, Track: null };
    }
}