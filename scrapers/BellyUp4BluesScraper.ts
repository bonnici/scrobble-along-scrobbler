/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import _ = require("underscore");
import winston = require("winston");
import htmlentities = require("html-entities");

export class BellyUp4BluesScraper extends scrap.Scraper {

    private entities: any;

    constructor(name:string) {
        super(name);
        this.entities = new htmlentities.XmlEntities();
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var url = "http://directory.pronetlicensing.com/getsong.cgi?sid=3545&rn=" + Math.floor(Math.random()*100000);

        this.fetchUrl(url, (err, body) => {
            if (err) {
                callback(err, null);
                return;
            }
            this.parseBody(body, callback);
        });
    }

    private parseBody(body: string, callback: (err, song:song.Song) => void): void {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var parts = body.split(" - ");

        if (parts.length >= 2 && parts[0] && parts[1]) {
            callback(null, { Artist: this.entities.decode(parts[0].trim()), Track: this.entities.decode(parts[1].trim()) });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    }
}
