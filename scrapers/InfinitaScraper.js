/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//import scrap = require("Scraper");
var jsonScrap = require("./JsonScraper");


var winston = require("winston");

/*
export class InfinitaScraper extends scrap.Scraper {
private url: string;

constructor(name:string) {
super(name);
this.url = "http://www.infinita.cl/datas/ahora.xml";
}

public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
this.fetchUrl(this.url, (err, body) => {
if (err) {
callback(err, null);
return;
}
this.parseHtml(body, callback);
});
}

private parseHtml(body: string, callback: (err, song:song.Song) => void): void {
if (!body) {
winston.warn("InfinitaScraper: No HTML body");
callback(null, { Artist: null, Track: null });
return;
}

// Cheerio not working, use regex
var artistPattern = /<interprete><!\[CDATA\[(.*?)]]><\/interprete>/;
var artistMatches = artistPattern.exec(body);
var titlePattern = /<nombre><!\[CDATA\[(.*?)]]><\/nombre>/;
var titleMatches = titlePattern.exec(body);

if (!artistMatches || artistMatches.length == 0 || !titleMatches || titleMatches.length ==0) {
callback(null, { Artist: null, Track: null });
return;
}
var artistData = artistMatches[1];
var songData = titleMatches[1];

//var $ = cheerio.load(body);

//var artistData = $('interprete').text();
//var songData = $('nombre').text();

if (!artistData || !songData) {
callback(null, { Artist: null, Track: null });
return;
}

var artistName = artistData.trim();
var songName = songData.trim();

if (!artistName || !songName) {
callback(null, { Artist: null, Track: null });
} else {
callback(null, { Artist: artistName, Track: songName });
}
}
}
*/
var InfinitaScraper = (function (_super) {
    __extends(InfinitaScraper, _super);
    function InfinitaScraper(name) {
        _super.call(this, name);
    }
    InfinitaScraper.prototype.getUrl = function (scraperParam) {
        return "http://vivo.infinita.cl/json/last.json?_=" + new Date().getTime();
    };

    InfinitaScraper.prototype.preprocessBody = function (body) {
        //trim jsonp from start "last(" and end ")"
        return body.substring(5, body.length - 1);
    };

    InfinitaScraper.prototype.extractNowPlayingSong = function (jsonData) {
        if (!jsonData || !jsonData.items || !jsonData.items.length > 0 || !jsonData.items[0].song) {
            winston.error("InfinitaScraper found invalid json ", jsonData);
            return { Artist: null, Track: null };
        }

        var firstTrack = jsonData.items[0].song;
        var splitDetails = firstTrack.split("|");

        if (splitDetails.length < 2) {
            winston.error("InfinitaScraper found invalid track details ", firstTrack);
            return { Artist: null, Track: null };
        } else {
            return {
                Artist: splitDetails[0].trim(),
                Track: splitDetails[1].trim()
            };
        }
    };
    return InfinitaScraper;
})(jsonScrap.JsonScraper);
exports.InfinitaScraper = InfinitaScraper;

//# sourceMappingURL=InfinitaScraper.js.map
