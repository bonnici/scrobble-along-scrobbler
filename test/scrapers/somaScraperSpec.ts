/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>

import util = require("util");
import assert = require("assert");
import moment = require("moment");
import nock = require("nock");

import soma = require("../../scrapers/SomaScraper");

describe('SomaScraper', () => {

	describe("fetchAndParse", () => {

        var setupTest = (responseCode: number, response: string, isResponseFile: boolean) => {
            var station = "bagel";
            var host = "http://somafm.com";   
            var path = "/" + station + "/songhistory.html";

	        console.log("rebuild");
            var scope = nock(host)
                .get(path);

            if (isResponseFile) {
                scope.replyWithFile(responseCode, __dirname + response);
            }
            else {
                scope.reply(responseCode, response);
            }
            
            var parser = new soma.SomaScraper("name", station);

            return parser;
        };
        
        it('should parse a minimal response with a single song', () => {
            var parser = setupTest(200, "/replies/somafm-minimalsong.htm", true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Generationals", Track: "I Never Know" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
        });

        it('should parse a normal response with a single song', () => {
            var parser = setupTest(200, "/replies/somafm-singlesong.htm", true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Generationals", Track: "I Never Know" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
        });
        
        it('should find the first song in a normal response with a many songs', () => {
            var parser = setupTest(200, "/replies/somafm-sample.htm", true);
			var done: boolean = false;

			runs(() => {
				parser.fetchAndParse((err, song) => {
					expect(err).toBeFalsy();
					expect(song).toEqual({ Artist: "Generationals", Track: "I Never Know" });
					done = true;
				});
			});

			waitsFor(() => { return done; }, "Timeout", 5000);
        });

        it('should return nulls when on an air break', () => {
            var parser = setupTest(200, "/replies/somafm-offair.htm", true);
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
        
        it('should return null for an invalid response', () => {
            var parser = setupTest(200, "/replies/somafm-invalid.htm", true);
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