/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("../Scraper");
import song = require("../../Song");

import cheerio = require("cheerio");
import winston = require("winston");

export class CheerioScraper extends scrap.Scraper {
    public xmlMode: boolean;

	constructor(name:string) {
		super(name);
        this.xmlMode = false;
	}

	public getUrl(scraperParam?:string): string {
		throw "Abstract Class";
	}

	public parseCheerio($:any, callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void): void {
		throw "Abstract Class";
	}

	public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void, scraperParam?:string): void {
		this.fetchUrl(this.getUrl(scraperParam), (err, body) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (!body) {
                winston.warn("CheerioScraper: No HTML body");
                callback(null, { Artist: null, Track: null });
                return;
            }

            try {
                var $ = cheerio.load(body, { xmlMode: this.xmlMode });
                this.parseCheerio($, callback);
            }
            catch (e) {
                winston.warn("CheerioScraper: Could not parse HTML");
                callback("Could not parse HTML", null);
            }
		});
	}
}