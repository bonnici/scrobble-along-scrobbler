/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class GnlScraper extends scrap.CheerioScraper {
    constructor(name:string) {
        super(name);
        this.ignoreStatusCode = true;
    }

    public getUrl(): string {
        return "http://gnl.fm/radiodj/live_stat.php";
    }

    public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        var trackTd = $('td.playing_track');

        if (trackTd.length == 0) {
            callback(null, {Artist: null, Track: null});
            return;
        }

        var trackText = trackTd.eq(0).text();

        var split = trackText.split(" - ");
        if (split.length < 2) {
            callback(null, {Artist: null, Track: null});
            return;
        }

        var artist = split[0];
        var title = split[1];

        if (title.lastIndexOf("[") > 0) {
            title = title.substr(0, title.lastIndexOf("[") - 1);
        }

        callback(null, {Artist: artist, Track: title});
    }
}