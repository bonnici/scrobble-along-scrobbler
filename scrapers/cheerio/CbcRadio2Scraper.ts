/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");
import moment = require("moment-timezone");

export class CbcRadio2Scraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		var now = moment().tz("America/New_York");
		return "http://music.cbc.ca/broadcastlogs/broadcastlogs.aspx?broadcastdate=" + now.format("YYYY-MM-DD");
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		var tracks = $('div.logShowEntry');

		var now = moment().tz("America/New_York");
		var trackDateTime = moment().tz("America/New_York"); // hours/seconds will be updated later
		trackDateTime.set('second', 0);
		trackDateTime.set('millisecond', 0);

		var curTrackIndex:number = null;
		tracks.each(function(idx: number) {
			var _this:any = $(this); // Trick TypeScript parser
			var timeElem = _this.find('div.logEntryTime');

			if (timeElem) {
				var timeText = timeElem.text().trim();
				var trackTime = moment(timeText, "hh:mm A");
				trackDateTime.set('hour', trackTime.get('hour'));
				trackDateTime.set('minute', trackTime.get('minute'));

				if (trackDateTime > now) {
					curTrackIndex = idx - 1;
					return false; // break
				}
			}
			return;
		});

		if (curTrackIndex === null || curTrackIndex < 0) {
			winston.warn("CbcRadio2Scraper could not find current track");
			callback(null, { Artist: null, Track: null });
		}
		else {
			var trackElem = tracks.eq(curTrackIndex);
			var trackName = trackElem.find('h3').text().trim();

            var matchingDt:any = null;
            trackElem.find('dt').each(function() {
                var _this:any = $(this); // Trick TypeScript parser
                if (_this.text().trim().toLowerCase() == 'artist') {
                    matchingDt = _this;
                    return false;
                }
                return;
            });

            if (!matchingDt) {
                return null;
            }
            var matchingDd = matchingDt.next('dd');
            var trackArtist = matchingDd ? matchingDd.text().trim() : null;

			if (trackArtist) {
				callback(null, { Artist: trackArtist, Track: this.capitalize(trackName) });
			}
			else {
				winston.warn("CbcRadio2Scraper could not find artist");
				callback(null, { Artist: null, Track: null });
			}
		}
	}
}