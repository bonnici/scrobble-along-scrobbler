/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>

import util = require("util");
import assert = require("assert");
import moment = require("moment");
import nock = require("nock");

import kexp = require("../../scrapers/KexpScraper");

describe('KexpScraper', () => {

	describe("fetchAndParse", () => {

		var setupTest = (responseCode: number, response: string, isResponseFile: boolean) => {
			var dateString = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");
			var host = "http://kexp.org";
			var path = "/playlist/playlistupdates?channel=1&start=%s&since=%s";
			var formattedPath = util.format(path, dateString, dateString);

			var scope = nock(host)
				.get(formattedPath);

			if (isResponseFile) {
				scope.replyWithFile(responseCode, __dirname + response);
			}
			else {
				scope.reply(responseCode, response);
			}

			var parser = new kexp.KexpScraper("name", host + path);
			parser.defaultStartTime = dateString;

			return parser;
		};

		it('should parse a minimal response with a single song', () => {
			var parser = setupTest(200, "/replies/kexp-minimalsong.htm", true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Tame Impala", Track: "Apocalypse Dreams" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});

		it('should parse a normal response with a single song', () => {
			var parser = setupTest(200, "/replies/kexp-singlesong.htm", true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Tame Impala", Track: "Apocalypse Dreams" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});

		it('should find the first song in a normal response with a many songs', () => {
			var parser = setupTest(200, "/replies/kexp-sample.htm", true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Tame Impala", Track: "Apocalypse Dreams" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
		});

		it('should return nulls when on an air break', () => {
			var parser = setupTest(200, "/replies/kexp-airbreak.htm", true);
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

		it('should return null for a badly formed response', () => {
			var parser = setupTest(200, "badly formed response", false);
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