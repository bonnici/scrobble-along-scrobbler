/// <reference path="../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>

import util = require("util");
import assert = require("assert");

import scrap = require("../scrapers/Scraper");
import scrob = require("../Scrobbler");
import lfmDao = require("../LastFmDao");

var nullSong = { Artist: null, Track: null };

describe("Scrobbler", () => {

	describe("scrapeAndScrobble", () => {

		var fetchAndParseSpy;
		var lastFmDao:any;
		var mockStation;
		var mockScraper:scrap.Scraper;
		var scrobbler:scrob.Scrobbler;

		beforeEach(() => {
			mockScraper = new scrap.DummyScraper("");
			fetchAndParseSpy = spyOn(mockScraper, 'fetchAndParse');
			console.log("rebuild");

			lastFmDao = new lfmDao.DummyLastFmDao();
			spyOn(lastFmDao, 'postNowPlaying');
			spyOn(lastFmDao, 'scrobble');

			scrobbler = new scrob.Scrobbler(lastFmDao);

			mockStation = { StationName: "MockStation", ScraperName: "MockScraper", Session: "MockScraperSession" };
		});

		it('should post now playing but not scrobble if a scrobbler finds a short song followed by a break', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 35 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(1);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[0][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[0][2]).toEqual(mockStation.Session);

			expect(lastFmDao.scrobble.callCount).toEqual(0);
		});

		it('should post now playing and scrobble if a scrobbler finds a long song followed by a break', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(2);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
		});

		it('should post now playing and scrobble if a scrobbler finds a long song followed by another song', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			var song2 = { Artist: "TestArtist2", Track: "TestTrack2" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song2) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(3);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Artist).toEqual(song2.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Track).toEqual(song2.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
		});

		it('should post now playing if single scrobbler finds a short song between two breaks', () => {
			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(1);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(0);
		});

		it('should post now playing and scrobble if single scrobbler finds a long song between two breaks', () => {
			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 52 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(2);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
		});

		it('should post now playing for both songs if single scrobbler finds two short songs', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			var song2 = { Artist: "TestArtist2", Track: "TestTrack2" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song2) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(2);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song2.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song2.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(0);
		});

		it('should post now playing if an error is encountered after a short song', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(1);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(0);
		});

		it('should post now playing and not scrobble if many errors are encountered after a short song', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 35 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 50 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 76 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(2);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(0);
		});

		it('should post now playing and scrobble if many errors are encountered after a long song', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 50 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 75 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 98 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(3);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
		});

		it('should not scrobble the same song twice in a row', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 50 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 65 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 100 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 115 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(5);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
		});

		it('should not scrobble the same song twice in a row if an error occurs in the middle', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 37 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb("Error", null) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 50 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 65 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 100 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [], 115 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(5);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Track).toEqual(song1.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
		});

		it('should post now playing and scrobble for multiple scrapers at the same time', () => {
			var scraper1 = new scrap.DummyScraper("Scraper1");
			var fetchAndParseSpy1 = spyOn(scraper1, 'fetchAndParse');

			var scraper2 = new scrap.DummyScraper("Scraper2");
			var fetchAndParseSpy2 = spyOn(scraper2, 'fetchAndParse');

			var scrobbler = new scrob.Scrobbler(lastFmDao);

			var mockStation1 = { StationName: "MockStation1", ScraperName: scraper1.name, Session: "MockSession1" };
			var mockStation2 = { StationName: "MockStation2", ScraperName: scraper2.name, Session: "MockSession2" };

			var song11 = { Artist: "TestArtist11", Track: "TestTrack11" };
			fetchAndParseSpy1.andCallFake((cb) => { cb(null, song11) });
			var song21 = { Artist: "TestArtist21", Track: "TestTrack21" };
			fetchAndParseSpy2.andCallFake((cb) => { cb(null, song21) });
			scrobbler.scrapeAndScrobble(scraper1, mockStation1, [], 1000);
			scrobbler.scrapeAndScrobble(scraper2, mockStation2, [], 1000);

			fetchAndParseSpy1.andCallFake((cb) => { cb(null, song11) });
			var song22 = { Artist: "TestArtist22", Track: "TestTrack22" };
			fetchAndParseSpy2.andCallFake((cb) => { cb(null, song22) });
			scrobbler.scrapeAndScrobble(scraper1, mockStation1, [], 15 * 1000);
			scrobbler.scrapeAndScrobble(scraper2, mockStation2, [], 15 * 1000);

			fetchAndParseSpy1.andCallFake((cb) => { cb(null, song11) });
			fetchAndParseSpy2.andCallFake((cb) => { cb(null, song22) });
			scrobbler.scrapeAndScrobble(scraper1, mockStation1, [], 37 * 1000);
			scrobbler.scrapeAndScrobble(scraper2, mockStation2, [], 37 * 1000);

			var song12 = { Artist: "TestArtist12", Track: "TestTrack12" };
			fetchAndParseSpy1.andCallFake((cb) => { cb(null, song12) });
			fetchAndParseSpy2.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(scraper1, mockStation1, [], 50 * 1000);
			scrobbler.scrapeAndScrobble(scraper2, mockStation2, [], 50 * 1000);

			fetchAndParseSpy1.andCallFake((cb) => { cb(null, nullSong) });
			fetchAndParseSpy2.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(scraper1, mockStation1, [], 65 * 1000);
			scrobbler.scrapeAndScrobble(scraper2, mockStation2, [], 65 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(7);

			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song11.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song11.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[0][1]).toEqual(mockStation1.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[0][2]).toEqual(mockStation1.Session);

			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song21.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song21.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][1]).toEqual(mockStation2.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[1][2]).toEqual(mockStation2.Session);

			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Artist).toEqual(song11.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Track).toEqual(song11.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Artist).toEqual(song22.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Track).toEqual(song22.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Artist).toEqual(song11.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Track).toEqual(song11.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[5][0].Artist).toEqual(song22.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[5][0].Track).toEqual(song22.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[6][0].Artist).toEqual(song12.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[6][0].Track).toEqual(song12.Track);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song11.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song11.Track);
			expect(lastFmDao.scrobble.argsForCall[0][1]).toEqual(mockStation1.StationName);
			expect(lastFmDao.scrobble.argsForCall[0][2]).toEqual(mockStation1.Session);
		});

		it('should post now playing and scrobble only to station when null user list is passed', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, null, 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, null, 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, null, 37 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(2);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[0][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[0][2]).toEqual(mockStation.Session);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[1][2]).toEqual(mockStation.Session);

			expect(lastFmDao.scrobble.callCount).toEqual(1);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.scrobble.argsForCall[0][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.scrobble.argsForCall[0][2]).toEqual(mockStation.Session);
		});

		it('should post now playing and scrobble to user list when it is not empty', () => {
			var song1 = { Artist: "TestArtist", Track: "TestTrack" };
			var user1 = { UserName: "user1", Session: "user1Session" };
			var user2 = { UserName: "user2", Session: "user2Session" };
			var user3 = { UserName: "user3", Session: "user3Session" };

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [user1, user2, user3], 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, song1) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [user2], 15 * 1000);

			fetchAndParseSpy.andCallFake((cb) => { cb(null, nullSong) });
			scrobbler.scrapeAndScrobble(mockScraper, mockStation, [user2, user3], 37 * 1000);

			expect(lastFmDao.postNowPlaying.callCount).toEqual(6);

			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[0][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[0][2]).toEqual(mockStation.Session);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[1][1]).toEqual(user1.UserName);
			expect(lastFmDao.postNowPlaying.argsForCall[1][2]).toEqual(user1.Session);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[2][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[2][1]).toEqual(user2.UserName);
			expect(lastFmDao.postNowPlaying.argsForCall[2][2]).toEqual(user2.Session);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[3][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[3][1]).toEqual(user3.UserName);
			expect(lastFmDao.postNowPlaying.argsForCall[3][2]).toEqual(user3.Session);

			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[4][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[4][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.postNowPlaying.argsForCall[4][2]).toEqual(mockStation.Session);
			expect(lastFmDao.postNowPlaying.argsForCall[5][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.postNowPlaying.argsForCall[5][0].Track).toEqual(song1.Track);
			expect(lastFmDao.postNowPlaying.argsForCall[5][1]).toEqual(user2.UserName);
			expect(lastFmDao.postNowPlaying.argsForCall[5][2]).toEqual(user2.Session);

			expect(lastFmDao.scrobble.callCount).toEqual(3);
			expect(lastFmDao.scrobble.argsForCall[0][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[0][0].Track).toEqual(song1.Track);
			expect(lastFmDao.scrobble.argsForCall[0][1]).toEqual(mockStation.StationName);
			expect(lastFmDao.scrobble.argsForCall[0][2]).toEqual(mockStation.Session);
			expect(lastFmDao.scrobble.argsForCall[1][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[1][0].Track).toEqual(song1.Track);
			expect(lastFmDao.scrobble.argsForCall[1][1]).toEqual(user2.UserName);
			expect(lastFmDao.scrobble.argsForCall[1][2]).toEqual(user2.Session);
			expect(lastFmDao.scrobble.argsForCall[2][0].Artist).toEqual(song1.Artist);
			expect(lastFmDao.scrobble.argsForCall[2][0].Track).toEqual(song1.Track);
			expect(lastFmDao.scrobble.argsForCall[2][1]).toEqual(user3.UserName);
			expect(lastFmDao.scrobble.argsForCall[2][2]).toEqual(user3.Session);
		});
	});

});