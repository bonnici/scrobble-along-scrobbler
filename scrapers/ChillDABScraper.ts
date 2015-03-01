/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import winston = require("winston");

export class ChillDABScraper extends scrap.Scraper {
    private url: string;

    constructor(name:string) {
        super(name);
        this.url =  "http://www.ebulabs.org/tools/radiovis-ajaxplayer/radiovis-webplayer/comet.php?last_id=ID%3Alqctwebnode1-41914-1420627692907-2%3A2961232%3A-1%3A1%3A453543399&topic=%2Ftopic%2Fdab%2Fce1%2Fc199%2Fc1c3%2F0%2Ftext&visserver=vis.musicradio.com&visport=61613";
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        this.fetchUrl(this.url, (err, body) => {
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

        var infoPattern = /^TEXT Now on Chill: (.*?) with (.*?)$/m;
        var infoMatches = infoPattern.exec(body);

        if (infoMatches && infoMatches.length > 2) {
            callback(null, {
                Artist: this.capitalize(infoMatches[1].trim()),
                Track: this.capitalize(infoMatches[2].trim())
            });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    }
}