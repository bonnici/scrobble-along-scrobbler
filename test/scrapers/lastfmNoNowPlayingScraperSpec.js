/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>
var nock = require("nock");

var lfm = require("../../scrapers/LastfmNoNowPlayingScraper");

function setupTest(jsonResponseCode, jsonResponse, username, apiKey) {
    var host = "http://ws.audioscrobbler.com";
    var path = "/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + apiKey + "&limit=1&format=json";

    var scope = nock(host).get(path).reply(jsonResponseCode, jsonResponse);

    return new lfm.LastfmNoNowPlayingScraper("TestScraper", apiKey);
}

describe('LastfmScraper', function () {
    describe("fetchAndParse", function () {
        afterEach(function () {
            nock.cleanAll();
        });

        it('should return a just played song if its been played in the last minute', function () {
            var timestamp = "" + Math.floor((new Date().getTime() / 1000) - 59);
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
						"date": {\
						  "uts": "' + timestamp + '"\
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
                parser.fetchAndParse(function (err, nowPlayingSong, justPlayedSong) {
                    expect(err).toBeFalsy();
                    expect(nowPlayingSong).toBeNull();
                    expect(justPlayedSong).toEqual({ Artist: "Dead Letter Circus", Track: "Big" });
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should not return a just played song if its hasnt been played in the last 5 minutes', function () {
            var timestamp = "" + Math.floor((new Date().getTime() / 1000) - (5 * 60 + 1));
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
						"date": {\
						  "uts": "' + timestamp + '"\
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
                parser.fetchAndParse(function (err, nowPlayingSong, justPlayedSong) {
                    expect(err).toBeFalsy();
                    expect(nowPlayingSong).toBeNull();
                    expect(justPlayedSong).toEqual({ Artist: null, Track: null });
                    done = true;
                }, "username");
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });
    });
});

//# sourceMappingURL=lastfmNoNowPlayingScraperSpec.js.map
