/// <reference path="../../definitions/dummy-definitions/cheerio.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var scrap = require("./Scraper");

var _ = require("underscore");
var cheerio = require("cheerio");
var moment = require('moment');
var util = require("util");
var winston = require("winston");

var NnmScraper = (function (_super) {
    __extends(NnmScraper, _super);
    function NnmScraper(name, marciUrl, jsonUrl1, jsonUrl2) {
        _super.call(this, name);
        this.artistFilter = ['tobi.', 'nnm', 'discojingles', 'connection timed out', 'tunein', 'beer magazine', 'cc wifi radio', 'www.vinja.tv'];
        this.artistContainsFilter = ['new normal music', '818.52.radio'];
        this.defaultStartTime = null;
        this.marciUrl = marciUrl || "http://marci228.getmarci.com/";
        this.jsonUrl1 = jsonUrl1 || "http://p1.radiocdn.com/player.php?hash=69d494aa557d8028daf3100b0538f48e48c53925&action=getCurrentData&_=%s";
        this.jsonUrl2 = jsonUrl2 || "http://p2.radiocdn.com/player.php?hash=69d494aa557d8028daf3100b0538f48e48c53925&action=getCurrentData&_=%s";
    }
    NnmScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        // First try the marci URL (which contains full track/artist names
        this.tryParseMarci(this.marciUrl, function (err, marciSong) {
            if (!err) {
                winston.info("NnmScraper found song from Marci", marciSong);
                callback(null, marciSong);
                return;
            }

            // Try each json URL if the marci URL fails
            var fullUrl1 = util.format(_this.jsonUrl1, _this.startTime());
            _this.tryParseJson(fullUrl1, function (err, jsonSong1) {
                if (!err) {
                    winston.info("NnmScraper found song from JSON URL 1", jsonSong1);
                    callback(null, jsonSong1);
                    return;
                }

                var fullUrl2 = util.format(_this.jsonUrl2, _this.startTime());
                _this.tryParseJson(fullUrl2, function (err, jsonSong2) {
                    if (!err) {
                        winston.info("NnmScraper found song from JSON URL 2", jsonSong2);
                        callback(null, jsonSong2);
                        return;
                    }
                    winston.info("NnmScraper could not find song");
                    callback(err, null);
                    return;
                });
            });
        });
    };

    // Separated so that it is mockable
    NnmScraper.prototype.startTime = function () {
        return this.defaultStartTime || (moment().unix() * 1000).toString();
    };

    NnmScraper.prototype.tryParseJson = function (url, callback) {
        var _this = this;
        this.fetchUrl(url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseJson(body, callback);
        });
    };

    NnmScraper.prototype.parseJson = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        try  {
            var json = JSON.parse(body);
        } catch (e) {
            winston.error("Could not parse JSON body", body);
            callback("Could not parse JSON body", null);
            return;
        }

        if (json && json.artist && json.track) {
            if (this.artistFiltered(json.artist)) {
                callback(null, { Artist: null, Track: null });
                return;
            } else {
                callback(null, { Artist: json.artist, Track: json.track });
                return;
            }
        } else {
            callback(null, { Artist: null, Track: null });
            return;
        }
    };

    NnmScraper.prototype.tryParseMarci = function (url, callback) {
        var _this = this;
        this.fetchUrl(url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseMarci(body, callback);
        });
    };

    NnmScraper.prototype.parseMarci = function (body, callback) {
        if (!body) {
            callback("Blank marci", null);
            return;
        }

        var $ = cheerio.load(body);
        var block1 = $('#block1').first();
        var letterbox1 = block1.children('#letterbox1').first();
        if (!letterbox1 || letterbox1.length == 0) {
            callback("Could not parse marci", null);
            return;
        }

        var onAir = block1.children('.on-air');
        if (!onAir || onAir.length == 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }

        if (letterbox1) {
            var artist = letterbox1.attr("data-artist");
            var track = letterbox1.attr("data-title");

            if (artist && track) {
                if (this.artistFiltered(artist)) {
                    callback(null, { Artist: null, Track: null });
                    return;
                } else {
                    callback(null, { Artist: artist, Track: track });
                    return;
                }
            }
        }

        callback("Could not parse marci", null);
        return;
    };

    NnmScraper.prototype.artistFiltered = function (artist) {
        return _.any(this.artistFilter, function (curArtist) {
            return curArtist == artist.toLowerCase();
        }) || _.any(this.artistContainsFilter, function (curArtist) {
            return artist.toLowerCase().indexOf(curArtist) != -1;
        });
    };
    return NnmScraper;
})(scrap.Scraper);
exports.NnmScraper = NnmScraper;

//# sourceMappingURL=NnmScraper.js.map
