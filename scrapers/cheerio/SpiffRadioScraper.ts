/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class SpiffRadioScraper extends scrap.CheerioScraper {
    private id: string;

    constructor(name:string, id?: string) {
        super(name);
        this.id = id;
        this.xmlMode = true;
    }

    getUrl(lastfmUsername?:string): string {
        if (this.id) {
            var urlSuffix = this.id + "/?xspf=1";
        } else {
            var urlSuffix = lastfmUsername;
        }
        return " http://www.spiff-radio.org/station/" + urlSuffix;
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var tracks = $('trackList track');

        if (tracks.length > 0) {
            var firstTrack = tracks.eq(0);

            var title = firstTrack.children('title').eq(0).text();
            var artist = firstTrack.children('creator').eq(0).text();

            // Workaround for Beats1 having an opening bracket appended to the end of artist names
            if (artist.length > 2 && artist.substr(artist.length-2, 2) == " (") {
                artist = artist.substr(0, artist.length-2);
            }

            if (title && artist) {
                callback(null, { Artist: artist, Track: title });
                return;
            }
        }
        callback(null, { Artist: null, Track: null });
    }
}