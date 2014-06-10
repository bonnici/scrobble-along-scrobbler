/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>
var util = require("util");

var moment = require("moment");
var nock = require("nock");

var nnm = require("../../scrapers/NnmScraper");

describe('NnmScraper', function () {
    describe("fetchAndParse", function () {
        var setupTest = function (marciResponseCode, marciResponse, isMarciFile, jsonResponseCode1, jsonResponse1, jsonResponseCode2, jsonResponse2) {
            var unixTime = moment().unix().toString();
            var marciHost = "http://marci228.getmarci.com";
            var host1 = "http://p1.radiocdn.com";
            var host2 = "http://p2.radiocdn.com";
            var path = "/player.php?hash=69d494aa557d8028daf3100b0538f48e48c53925&action=getCurrentData&_=%s";
            var formattedPath = util.format(path, unixTime);

            var marciScope = nock(marciHost).get("/");

            if (isMarciFile) {
                marciScope.replyWithFile(marciResponseCode, __dirname + marciResponse);
            } else {
                marciScope.reply(marciResponseCode, marciResponse);
            }

            var jsonScope1 = nock(host1).get(formattedPath).reply(jsonResponseCode1, jsonResponse1);

            var jsonScope2 = nock(host2).get(formattedPath).reply(jsonResponseCode2, jsonResponse2);

            var parser = new nnm.NnmScraper("name", marciHost + "/", host1 + path, host2 + path);
            parser.defaultStartTime = unixTime;

            return parser;
        };

        afterEach(function () {
            nock.cleanAll();
        });

        it('should parse a minimal marci response', function () {
            var parser = setupTest(200, '/replies/nnm-minimalsong.htm', true, 404, "", 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ben Folds Five", Track: "The Sound Of The Life Of The Mind" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a marci response with a single record', function () {
            var parser = setupTest(200, '/replies/nnm-singlesong.htm', true, 404, "", 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ben Folds Five", Track: "The Sound Of The Life Of The Mind" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a normal marci response', function () {
            var parser = setupTest(200, '/replies/nnm-sample.htm', true, 404, "", 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ben Folds Five", Track: "The Sound Of The Life Of The Mind" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return null for marci filter', function () {
            var parser = setupTest(200, '/replies/nnm-filteredsong.htm', true, 404, "", 404, "");
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

        it('should return null for off air', function () {
            var parser = setupTest(200, '/replies/nnm-offair.htm', true, 404, "", 404, "");
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

        it('should fall back to json on invalid marci response', function () {
            var parser = setupTest(200, '/replies/nnm-invalid.htm', true, 200, '{"artist":"Ra Ra Riot","track":"Beta Love"}', 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should fall back to json on nofirstblock marci response', function () {
            var parser = setupTest(200, '/replies/nnm-nofirstblock.htm', true, 200, '{"artist":"Ra Ra Riot","track":"Beta Love"}', 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should fall back to json on blank marci response', function () {
            var parser = setupTest(200, '', false, 200, '{"artist":"Ra Ra Riot","track":"Beta Love"}', 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should fall back to json on failed marci response', function () {
            var parser = setupTest(404, '', false, 200, '{"artist":"Ra Ra Riot","track":"Beta Love"}', 404, "");
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should fall back to 2nd json on failed marci & first json response', function () {
            var parser = setupTest(404, '', false, 404, "", 200, '{"artist":"Ra Ra Riot","track":"Beta Love"}');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a minimal json response', function () {
            var parser = setupTest(404, '', false, 404, "", 200, '{"artist":"Ra Ra Riot","track":"Beta Love"}');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should parse a normal json response', function () {
            var parser = setupTest(404, '', false, 404, "", 200, '{"image": "http://userserve-ak.last.fm/serve/126/29693821.png","artist":"Ra Ra Riot","track":"Beta Love"}');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Ra Ra Riot", Track: "Beta Love" });
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should fail when the json is invalid', function () {
            var parser = setupTest(404, '', false, 404, "", 200, 'invalid json');
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

        it('should return null the json is not in the right format', function () {
            var parser = setupTest(404, '', false, 404, "", 200, '{"image": "http://userserve-ak.last.fm/serve/126/29693821.png"}');
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

        it('should return null for an empty json response', function () {
            var parser = setupTest(404, '', false, 404, "", 200, "");
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

        //artist_filter = ['tobi.', 'nnm', 'discojingles', 'connection timed out', 'tunein', 'beer magazine', 'cc wifi radio']
        //artist_contains_filter = ['new normal music', '818.52.radio']
        it('should return null for json artist and artist contains filters', function () {
            var done = false;
            runs(function () {
                setupTest(404, '', false, 404, "", 200, '{"artist":"tobi.","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"nnm","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"discojingles","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"connection timed out","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"TuneIn","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"Beer Magazine","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"CC WIFI RADIO","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"something new normal music something","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);

            runs(function () {
                done = false;
                setupTest(404, '', false, 404, "", 200, '{"artist":"818.52.radio fm","track":"Beta Love"}').fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                });
            });
            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return an error on a json 404', function () {
            var parser = setupTest(404, '', false, 404, "", 404, "");
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

//# sourceMappingURL=nnmScraperSpec.js.map
