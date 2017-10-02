/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./CheerioScraper");
import song = require("../../Song");

import winston = require("winston");

export class KrautrockWorldScraper extends scrap.CheerioScraper {

	constructor(name:string) {
		super(name);
	}

	public getUrl(): string {
		return "http://radio.krautrock-world.com/playing.php";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
        // This HTML is really badly malformed
        const tables = $("table");
        if (!tables || tables.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        const subTables = tables.eq(1).find("table");
        if (!subTables || subTables.length < 3) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        const rows = subTables.eq(4).find("tr");
        if (!rows || rows.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        
        const tds = rows.eq(1).find("td");
        if (!tds || tds.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        
        const split = tds.eq(1).text().trim().split(" - ");
        if (split && split.length > 1) {
            callback(null, { Artist: split[0], Track: split[1] });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
	}
}