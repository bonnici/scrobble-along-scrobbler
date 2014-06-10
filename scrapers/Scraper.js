/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/request.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};


var request = require("request");
var winston = require("winston");

// Abstract base class
var Scraper = (function () {
    function Scraper(name) {
        this.name = name;
    }
    // Should call success with a song if it was found, success with null artist/track if no song was found,
    // failure if there was a recoverable error fetching or parsing
    Scraper.prototype.fetchAndParse = function (callback, scraperParam) {
        throw new Error("Abstract");
    };

    // protected
    Scraper.prototype.fetchUrl = function (fullUrl, callback) {
        this.fetchUrlWithHeaders(fullUrl, null, callback);
    };

    // protected
    Scraper.prototype.fetchUrlWithHeaders = function (fullUrl, headers, callback) {
        winston.info("Fetching URL", fullUrl);
        if (headers) {
            winston.info("With headers", headers);
        }
        request({ url: fullUrl, headers: headers || {} }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
                return;
            }

            if (error) {
                var errorStr = "Error requesting URL " + fullUrl;
                winston.error(errorStr, error);
                callback(errorStr, null);
            } else {
                var errorStr = "Bad status code (" + response.statusCode + ") fetching URL " + fullUrl;
                winston.warn(errorStr);
                callback(errorStr, null);
            }
        });
    };
    return Scraper;
})();
exports.Scraper = Scraper;

var DummyScraper = (function (_super) {
    __extends(DummyScraper, _super);
    function DummyScraper(suffix) {
        _super.call(this, "Dummy" + suffix);
        this.suffix = suffix;
    }
    DummyScraper.prototype.fetchAndParse = function (callback) {
        var songs = [
            { Artist: "Artist 1 " + this.suffix, Track: "Track 1 " + this.suffix },
            { Artist: "Artist 2 " + this.suffix, Track: "Track 3 " + this.suffix },
            { Artist: "Artist 3 " + this.suffix, Track: "Track 3 " + this.suffix }
        ];
        var index = Math.floor(Math.random() * songs.length);
        callback(null, songs[index]);
        return;
    };
    return DummyScraper;
})(Scraper);
exports.DummyScraper = DummyScraper;

//# sourceMappingURL=Scraper.js.map
