/// <reference path="../../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
/// <reference path="../../../definitions/typescript-node-definitions/nock.d.ts"/>


var nock = require("nock");

var scrap = require("../../scrapers/Scraper");

describe("Scraper", function () {
    describe("fetchUrl", function () {
        it('should return data if get request succeeds', function () {
            var host = "http://kexp.org";
            var path = "/playlist/playlistupdates?channel=1&start=2012-11-23T19:30:00.0&since=2012-11-23T19:30:00.0";
            console.log(host + path);

            nock(host).get(path).replyWithFile(200, __dirname + "/replies/kexp-sample.htm");

            var scraper = new scrap.Scraper("name");
            var done = false;

            runs(function () {
                scraper.fetchUrl(host + path, function (err, body) {
                    expect(err).toBeFalsy();
                    expect(body).toBeTruthy();
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });

        it('should return error message if get request fails', function () {
            var host = "http://kexp.org";
            var path = "/playlist/playlistupdates?channel=1&start=2012-11-23T19:30:00.0&since=2012-11-23T19:30:00.0";

            nock(host).get(path).reply(404);

            var scraper = new scrap.Scraper("name");
            var done = false;

            runs(function () {
                scraper.fetchUrl(host + path, function (err, body) {
                    expect(err).toBeTruthy();
                    expect(body).toBeFalsy();
                    done = true;
                });
            });

            waitsFor(function () {
                return done;
            }, "Timeout", 5000);
        });
    });
});

//# sourceMappingURL=scraperSpec.js.map
