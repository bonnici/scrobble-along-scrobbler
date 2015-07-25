/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class WmbrScraper extends scrap.CheerioScraper {
    constructor(name:string) {
        super(name);
        this.xmlMode = true;
    }

    public getUrl(): string {
        return "http://wmbr.org/dynamic.xml";
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var wmbrPlays = $('wmbr_plays');

        if (wmbrPlays.length > 0) {
            var playsHtml = wmbrPlays.eq(0).text();

            var $plays = cheerio.load(playsHtml);

            var recent = $plays('p.recent');
            var artist = $plays('p.recent b');

            if (recent.length > 0 && artist.length > 0) {
                var artistText = artist.eq(0).text();

                if (artistText) {
                    var recentText = recent.eq(0).text();
                    var artistEnd = recentText.indexOf(artistText) + artistText.length + 2;

                    if (artistEnd < recentText.length) {
                        var titleText = recentText.substring(artistEnd);

                        if (titleText) {
                            callback(null, {Artist: artistText, Track: titleText});
                            return;
                        }
                    }
                }
            }
        }
        callback(null, { Artist: null, Track: null });
    }
}