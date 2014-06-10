/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>

import util = require("util");
import assert = require("assert");
import moment = require("moment");
import nock = require("nock");

import jjj = require("../../scrapers/JjjScraper");

describe('JjjScraper', () => {

	describe("fetchAndParse", () => {

		var setupTest = (responseCode: number, response: string, isResponseFile: bool) => {
			var host = "http://www.abc.net.au";
			var path = "/triplej/feeds/playout/triplej_sydney_playout.xml";

			var scope = nock(host)
				.get(path);

			if (isResponseFile) {
				scope.replyWithFile(responseCode, __dirname + response);
			}
			else {
				scope.reply(responseCode, response);
			}
			
			var parser = new jjj.JjjScraper("JJJ");

			return parser;
		};
		
		it('should parse a minimal response', () => {
			var parser = setupTest(200, '/replies/triplej-minimalsong.xml', true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Kingswood", Track: "She's My Baby" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
		
		it('should parse a normal response with one track', () => {
			var parser = setupTest(200, '/replies/triplej-singlesong.xml', true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Kingswood", Track: "She's My Baby" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
		
		it('should parse a normal response with several tracks', () => {
			var parser = setupTest(200, '/replies/triplej-sample.xml', true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Kingswood", Track: "She's My Baby" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
		
		it('should return null the xml is not in the right format', () => {
			var parser = setupTest(200, '/replies/triplej-invalid.xml', true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: null, Track: null });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
		
		it('should return null if nothing is playing now', () => {
			var parser = setupTest(200, '/replies/triplej-airbreak.xml', true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: null, Track: null });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
		
		it('should return null for an empty response', () => {
			var parser = setupTest(200, "", false);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: null, Track: null });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
		
		it('should return an error on a 404', () => {
			var parser = setupTest(404, "", false);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeTruthy();
					expect(song).toBeNull();
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});
	});
});