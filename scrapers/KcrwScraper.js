/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//import scrap = require("./CheerioScraper");
var scrap = require("./JsonScraper");

var KcrwScraper = (function (_super) {
    __extends(KcrwScraper, _super);
    function KcrwScraper(name) {
        _super.call(this, name);
    }
    KcrwScraper.prototype.getUrl = function (lastfmUsername) {
        return "http://tracklist-api.kcrw.com/Simulcast";
    };

    KcrwScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.artist, Track: jsonData.title };
    };
    return KcrwScraper;
})(scrap.JsonScraper);
exports.KcrwScraper = KcrwScraper;
/*
export class KcrwScraper extends scrap.CheerioScraper {
constructor(name:string) {
super(name);
}
public getUrl(): string {
return "http://newmedia.kcrw.com/tracklists/index.php?channel=Live";
}
public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
var playlistRows = $("table#table_tracklist tbody tr");
if (playlistRows.length < 1) {
winston.warn("KcrwScraper: Not enough playlist rows (" + playlistRows.length + ")");
callback(null, { Artist: null, Track: null });
return;
}
var firstSongRow = playlistRows.eq(0);
if (firstSongRow.children("td").length < 3) {
winston.warn("KcrwScraper: Not enough playlist cols (" + firstSongRow.children("td").length + ")");
callback(null, { Artist: null, Track: null });
return;
}
var artist = firstSongRow.children("td").eq(1).text();
var song = firstSongRow.children("td").eq(2).text();
if (!artist || artist == '' || !song || song == '' || artist == 'Break' || song == "Break") {
winston.warn("KcrwScraper: Invalid cols (" + artist + "/" + song + ")");
callback(null, { Artist: null, Track: null });
return;
}
winston.info("KcrwScraper found song " + artist + " - " + song);
callback(null, { Artist: artist, Track: song });
}
}
*/
//# sourceMappingURL=KcrwScraper.js.map
