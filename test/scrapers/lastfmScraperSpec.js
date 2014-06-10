/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>
var nock = require("nock");

var lfm = require("../../scrapers/LastfmScraper");

function setupTest(jsonResponseCode, jsonResponse, username, apiKey) {
    var host = "http://ws.audioscrobbler.com";
    var path = "/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + apiKey + "&limit=1&format=json";

    var scope = nock(host).get(path).reply(jsonResponseCode, jsonResponse);

    return new lfm.LastfmScraper("TestScraper", apiKey);
}

describe('LastfmScraper', function () {
    describe("fetchAndParse", function () {
        afterEach(function () {
            nock.cleanAll();
        });

        it('should return an error code on a 404', function () {
            var parser = setupTest(404, '404', 'username', 'apiKey');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).not.toBeFalsy();
                    expect(song).toBeNull();
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return a song if its now playing', function () {
            var jsonString = '{\
				  "recenttracks": {\
					"track": [\
					  {\
						"artist": {\
						  "#text": "Dead Letter Circus",\
						  "mbid": "a92f9025-b15e-460c-8cc4-4784c8d66f39"\
						},\
						"name": "Big",\
						"streamable": "0",\
						"mbid": "c35e05c6-baf2-441a-8aea-ab12fc737eff",\
						"album": {\
						  "#text": "This Is The Warning",\
						  "mbid": "c44c6150-4de4-4bb0-837d-f9d07bfdaec3"\
						},\
						"url": "http:\/\/www.last.fm\/music\/Dead+Letter+Circus\/_\/Big",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/94075715.png",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/94075715.png",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/94075715.png",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/94075715.png",\
							"size": "extralarge"\
						  }\
						],\
						"@attr": {\
						  "nowplaying": "true"\
						}\
					  },\
					  {\
						"artist": {\
						  "#text": "Mikhael Paskalev",\
						  "mbid": "dfaaf791-92da-47a6-9d85-e40354fab527"\
						},\
						"name": "Jive Babe",\
						"streamable": "1",\
						"mbid": "e50a0174-513b-456b-a96b-94887bb87dee",\
						"album": {\
						  "#text": "Jive Babe",\
						  "mbid": ""\
						},\
						"url": "http:\/\/www.last.fm\/music\/Mikhael+Paskalev\/_\/Jive+Babe",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/87435363.jpg",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/87435363.jpg",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/87435363.jpg",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/87435363.jpg",\
							"size": "extralarge"\
						  }\
						],\
						"date": {\
						  "#text": "16 Mar 2014, 03:04",\
						  "uts": "1394939085"\
						}\
					  }\
					],\
					"@attr": {\
					  "user": "triplejradio",\
					  "page": "1",\
					  "perPage": "1",\
					  "totalPages": "166317",\
					  "total": "166317"\
					}\
				  }\
				}';

            var parser = setupTest(200, jsonString, 'username', 'apiKey');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Dead Letter Circus", Track: "Big" });
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return a single song if its now playing and the track data is not a list', function () {
            var jsonString = '{\
				  "recenttracks": {\
					"track":\
					  {\
						"artist": {\
						  "#text": "Dead Letter Circus",\
						  "mbid": "a92f9025-b15e-460c-8cc4-4784c8d66f39"\
						},\
						"name": "Big",\
						"streamable": "0",\
						"mbid": "c35e05c6-baf2-441a-8aea-ab12fc737eff",\
						"album": {\
						  "#text": "This Is The Warning",\
						  "mbid": "c44c6150-4de4-4bb0-837d-f9d07bfdaec3"\
						},\
						"url": "http:\/\/www.last.fm\/music\/Dead+Letter+Circus\/_\/Big",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/94075715.png",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/94075715.png",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/94075715.png",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/94075715.png",\
							"size": "extralarge"\
						  }\
						],\
						"@attr": {\
						  "nowplaying": "true"\
						}\
					  },\
					"@attr": {\
					  "user": "triplejradio",\
					  "page": "1",\
					  "perPage": "1",\
					  "totalPages": "166317",\
					  "total": "166317"\
					}\
				  }\
				}';

            var parser = setupTest(200, jsonString, 'username', 'apiKey');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: "Dead Letter Circus", Track: "Big" });
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return a null song if the most recent song is not now playing', function () {
            var jsonString = '{\
				  "recenttracks": {\
					"track": [\
					  {\
						"artist": {\
						  "#text": "Dead Letter Circus",\
						  "mbid": "a92f9025-b15e-460c-8cc4-4784c8d66f39"\
						},\
						"name": "Big",\
						"streamable": "0",\
						"mbid": "c35e05c6-baf2-441a-8aea-ab12fc737eff",\
						"album": {\
						  "#text": "This Is The Warning",\
						  "mbid": "c44c6150-4de4-4bb0-837d-f9d07bfdaec3"\
						},\
						"url": "http:\/\/www.last.fm\/music\/Dead+Letter+Circus\/_\/Big",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/94075715.png",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/94075715.png",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/94075715.png",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/94075715.png",\
							"size": "extralarge"\
						  }\
						]\
					  },\
					  {\
						"artist": {\
						  "#text": "Mikhael Paskalev",\
						  "mbid": "dfaaf791-92da-47a6-9d85-e40354fab527"\
						},\
						"name": "Jive Babe",\
						"streamable": "1",\
						"mbid": "e50a0174-513b-456b-a96b-94887bb87dee",\
						"album": {\
						  "#text": "Jive Babe",\
						  "mbid": ""\
						},\
						"url": "http:\/\/www.last.fm\/music\/Mikhael+Paskalev\/_\/Jive+Babe",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/87435363.jpg",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/87435363.jpg",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/87435363.jpg",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/87435363.jpg",\
							"size": "extralarge"\
						  }\
						],\
						"date": {\
						  "#text": "16 Mar 2014, 03:04",\
						  "uts": "1394939085"\
						}\
					  }\
					],\
					"@attr": {\
					  "user": "triplejradio",\
					  "page": "1",\
					  "perPage": "1",\
					  "totalPages": "166317",\
					  "total": "166317"\
					}\
				  }\
				}';

            var parser = setupTest(200, jsonString, 'username', 'apiKey');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return a null song if the JSON is invalid', function () {
            var jsonString = '{\
				  "recenttracks": {\
					"track": [\
					  {\
						"name": "Big",\
						"streamable": "0",\
						"mbid": "c35e05c6-baf2-441a-8aea-ab12fc737eff",\
						"album": {\
						  "#text": "This Is The Warning",\
						  "mbid": "c44c6150-4de4-4bb0-837d-f9d07bfdaec3"\
						},\
						"url": "http:\/\/www.last.fm\/music\/Dead+Letter+Circus\/_\/Big",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/94075715.png",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/94075715.png",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/94075715.png",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/94075715.png",\
							"size": "extralarge"\
						  }\
						],\
						"@attr": {\
						  "nowplaying": "true"\
						}\
					  },\
					  {\
						"artist": {\
						  "#text": "Mikhael Paskalev",\
						  "mbid": "dfaaf791-92da-47a6-9d85-e40354fab527"\
						},\
						"name": "Jive Babe",\
						"streamable": "1",\
						"mbid": "e50a0174-513b-456b-a96b-94887bb87dee",\
						"album": {\
						  "#text": "Jive Babe",\
						  "mbid": ""\
						},\
						"url": "http:\/\/www.last.fm\/music\/Mikhael+Paskalev\/_\/Jive+Babe",\
						"image": [\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/34s\/87435363.jpg",\
							"size": "small"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/64s\/87435363.jpg",\
							"size": "medium"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/126\/87435363.jpg",\
							"size": "large"\
						  },\
						  {\
							"#text": "http:\/\/userserve-ak.last.fm\/serve\/300x300\/87435363.jpg",\
							"size": "extralarge"\
						  }\
						],\
						"date": {\
						  "#text": "16 Mar 2014, 03:04",\
						  "uts": "1394939085"\
						}\
					  }\
					],\
					"@attr": {\
					  "user": "triplejradio",\
					  "page": "1",\
					  "perPage": "1",\
					  "totalPages": "166317",\
					  "total": "166317"\
					}\
				  }\
				}';

            var parser = setupTest(200, jsonString, 'username', 'apiKey');
            var done = false;

            runs(function () {
                parser.fetchAndParse(function (err, song) {
                    expect(err).toBeFalsy();
                    expect(song).toEqual({ Artist: null, Track: null });
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });
    });
});

//# sourceMappingURL=lastfmScraperSpec.js.map
