/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>


var moment = require("moment");
var nock = require("nock");

var jjj = require("../../scrapers/JjjScraper");

describe('JjjScraper', function () {
    describe("fetchAndParse", function () {
        var setupTest = function (responseCode, response, isResponseFile) {
            var host = "http://www.abc.net.au";
            var path = "/triplej/feeds/playout/triplej_sydney_playout.xml";

            var scope = nock(host).get(path);

            if (isResponseFile) {
                scope.replyWithFile(responseCode, __dirname + response);
            } else {
                scope.reply(responseCode, response);
            }

            var parser = new jjj.JjjScraper("JJJ");

            return parser;
        };

        it('should parse a minimal response', function () {
            var parser = setupTest(200, '/replies/triplej-minimalsong.xml', true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Kingswood", Track: "She's My Baby" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a normal response with one track', function () {
            var parser = setupTest(200, '/replies/triplej-singlesong.xml', true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Kingswood", Track: "She's My Baby" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a normal response with several tracks', function () {
            var parser = setupTest(200, '/replies/triplej-sample.xml', true);
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Kingswood", Track: "She's My Baby" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return null the xml is not in the right format', function () {
            var parser = setupTest(200, '/replies/triplej-invalid.xml', true);
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

        it('should return null if nothing is playing now', function () {
            var parser = setupTest(200, '/replies/triplej-airbreak.xml', true);
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

//# sourceMappingURL=jjjScraperSpec.js.map
