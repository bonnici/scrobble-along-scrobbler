import scrap = require("./CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class DrDkScraper extends scrap.CheerioScraper {
    constructor(name:string) {
        super(name);
    }

    public getUrl(scraperParam?:string):string {
        var url = "http://www.dr.dk/radio/live/" + scraperParam + "/"
        return url;
    }

    public parseCheerio($:any, callback:(err, newNowPlayingSong:song.Song, justScrobbledSong?:song.Song) => void):void {
        // Can't look for li.now-playing since that class is added after the page loads
        var trackDivs = $('ul.playlist-items li.track');

        if (trackDivs.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var trackInfo = trackDivs.eq(0).find('div.trackInfo');

        if (trackInfo.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var trackInfoChildren = trackInfo.eq(0).children();

        if (trackInfoChildren.length < 2) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artistName = '';
        var trackName = '';

        // Go through each child to get things like 'feat. X' in the artist name
        trackInfoChildren.each(function(i, elem) {
            var text = $(this).text().trim();

            if ($(this).hasClass('track')) {
                trackName += text + ' ';
            }
            else {
                artistName += text + ' ';
            }
        });

        if (trackName && artistName) {
            callback(null, { Artist: artistName.trim(), Track: trackName.trim() });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    }
}