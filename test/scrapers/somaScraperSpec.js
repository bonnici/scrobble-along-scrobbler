/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>


var moment = require("moment");
var nock = require("nock");

var soma = require("../../scrapers/SomaScraper");

describe('SomaScraper', function () {
    describe("fetchAndParse", function () {
        var setupTest = function (responseCode, response, isResponseFile) {
            var station = "bagel";
            var host = "http://somafm.com";
            var path = "/" + station + "/songhistory.html";

            console.log("rebuild");
            var scope = nock(host).get(path);

            if (isResponseFile) {
                scope.replyWithFile(responseCode, __dirname + response);
            } else {
                scope.reply(responseCode, response);
            }

            var parser = new soma.SomaScraper("name", station);

            return parser;
        };

        it('should parse a minimal response with a single song', function () {
            var parser = setupTest(200, "/replies/somafm-minimalsong.htm", true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Generationals", Track: "I Never Know" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a normal response with a single song', function () {
            var parser = setupTest(200, "/replies/somafm-singlesong.htm", true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Generationals", Track: "I Never Know" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should find the first song in a normal response with a many songs', function () {
            var parser = setupTest(200, "/replies/somafm-sample.htm", true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Generationals", Track: "I Never Know" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return nulls when on an air break', function () {
            var parser = setupTest(200, "/replies/somafm-offair.htm", true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return null for an empty response', function () {
            var parser = setupTest(200, "", false);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return null for a badly formed response', function () {
            var parser = setupTest(200, "badly formed response", false);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return null for an invalid response', function () {
            var parser = setupTest(200, "/replies/somafm-invalid.htm", true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return an error on a 404', function () {
            var parser = setupTest(404, "", false);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeTruthy();
                    expect(song).toBeNull();
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });
    });
});

//# sourceMappingURL=somaScraperSpec.js.map
