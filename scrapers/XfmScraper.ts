/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("CheerioScraper");
import song = require("../Song");

import winston = require("winston");

export class XfmScraper extends scrap.CheerioScraper {
	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://www.xfm.co.uk/london/";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		/*
		Cutdown example:
		<div id="on_radio" class="facet selected_facet">
			<div class="track_list">
				<ul>
					<li class="first nowplaying odd">
						<p class="track"><span class="track_artist"><a class="first" href="/artists/florence-the-machine/">Florence And The Machine</a></span>Cosmic Love</p>
						<p class="time"><a href="/london/playlist/" onclick="s_objectID=&quot;Now_1&quot;;return this.s_oc?this.s_oc(e):true">Now</a></p>
						<p class="download"><a href="https://itunes.apple.com/gb/album/cosmic-love/id319423336?i=319423609&amp;affToken=Xfm_Miscellaneous&amp;uo=4&amp;partnerId=1006" link_type="1" onclick="s_objectID=&quot;iTunes_1&quot;;return this.s_oc?this.s_oc(e):true"><span>iTunes</span></a></p>
					</li>
				</ul>
			</div>
		</div>
		 */

		var songElements = $('div#on_radio div.track_list li.nowplaying p.track');
		var artistElements = $('div#on_radio div.track_list li.nowplaying p.track span.track_artist');

		if (songElements.length < 1 || artistElements.length < 1) {
			winston.warn("XfmScraper: Invalid songElements or artistElements (" + songElements.length + ")/(" + artistElements.length + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		var songText = songElements.eq(0).text();
		var artistText = artistElements.eq(0).text();

		var artist = artistText.trim();
		var song = songText.substring(artistText.length).trim();

		if (!artist || !song) {
			winston.warn("XfmScraper: Invalid artist/song (" + artist + "/" + song + ")");
			callback(null, { Artist: null, Track: null });
			return;
		}

		winston.info("XfmScraper found song " + artist + " - " + song);
		callback(null, { Artist: artist, Track: song });
	}
}