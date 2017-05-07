/// <reference path="./definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="./definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="./definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
exports.__esModule = true;
var _ = require("underscore");
var winston = require("winston");
var DummyStationDao = (function () {
    function DummyStationDao() {
    }
    DummyStationDao.prototype.getStations = function (callback) {
        callback(null, [
            { StationName: "Station1", ScraperName: "Scraper1", Session: "" },
            { StationName: "Station1", ScraperName: "Scraper2", Session: "" },
            { StationName: "Station1", ScraperName: "Scraper1", Session: "" }
        ]);
    };
    DummyStationDao.prototype.updateStationNowPlayingSong = function (stationName, song, callback) {
        callback(null);
    };
    DummyStationDao.prototype.updateStationLastPlayedSong = function (stationName, song, callback) {
        callback(null);
    };
    return DummyStationDao;
}());
exports.DummyStationDao = DummyStationDao;
var MongoStationDao = (function () {
    function MongoStationDao(dbClient, crypter) {
        this.dbClient = dbClient;
        this.crypter = crypter;
    }
    MongoStationDao.prototype.getStations = function (callback) {
        var _this = this;
        if (!this.dbClient || !this.crypter) {
            callback("Invalid DAO setup", null);
            return;
        }
        this.dbClient.collection('station', function (error, collection) {
            if (error) {
                callback(error, null);
                return;
            }
            collection.find().toArray(function (err, results) {
                if (err) {
                    callback(error, null);
                    return;
                }
                var stations = [];
                _.each(results, function (record) {
                    if (!record._id || !record.parser) {
                        winston.error("Invalid station record found in DB:", record);
                    }
                    else {
                        var station = {
                            StationName: record._id,
                            ScraperName: record.parser,
                            ScraperParam: record.scraperParam,
                            Session: record.session ? _this.crypter.decrypt(record.session) : null,
                            Disabled: record.disabled ? ("true" == record.disabled) : false
                        };
                        if (record.nowPlayingArtist && record.nowPlayingTrack) {
                            station.nowPlayingSong = { Artist: record.nowPlayingArtist, Track: record.nowPlayingTrack };
                        }
                        if (record.lastPlayedArtist && record.lastPlayedArtist) {
                            station.lastPlayedSong = { Artist: record.lastPlayedArtist, Track: record.lastPlayedArtist };
                        }
                        winston.info("loaded station from DB", station.StationName);
                        stations.push(station);
                    }
                });
                callback(null, stations);
            });
        });
    };
    MongoStationDao.prototype.updateStationNowPlayingSong = function (stationName, song, callback) {
        if (!song) {
            callback("Invalid song");
            return;
        }
        this.doUpdateStationSong(stationName, { nowPlayingArtist: song.Artist, nowPlayingTrack: song.Track }, callback);
    };
    MongoStationDao.prototype.updateStationLastPlayedSong = function (stationName, song, callback) {
        if (!song || !song.Artist || !song.Track) {
            callback("Invalid song");
            return;
        }
        this.doUpdateStationSong(stationName, { lastPlayedArtist: song.Artist, lastPlayedTrack: song.Track }, callback);
    };
    MongoStationDao.prototype.doUpdateStationSong = function (stationName, updateFields, callback) {
        if (!this.dbClient) {
            callback("Invalid DAO setup");
            return;
        }
        this.dbClient.collection('station', function (error, collection) {
            collection.findAndModify({ _id: stationName }, [['_id', 'asc']], { $set: updateFields }, callback);
        });
    };
    return MongoStationDao;
}());
exports.MongoStationDao = MongoStationDao;
//# sourceMappingURL=StationDao.js.map