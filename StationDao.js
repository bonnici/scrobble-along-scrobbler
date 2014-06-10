/// <reference path="../definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>



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
    return DummyStationDao;
})();
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
                    } else {
                        var station = {
                            StationName: record._id,
                            ScraperName: record.parser,
                            ScraperParam: record.scraperParam,
                            Session: record.session ? _this.crypter.decrypt(record.session) : null,
                            Disabled: record.disabled ? ("true" == record.disabled) : false
                        };
                        winston.info("loaded station from DB", station.StationName);
                        stations.push(station);
                    }
                });
                callback(null, stations);
            });
        });
    };
    return MongoStationDao;
})();
exports.MongoStationDao = MongoStationDao;

//# sourceMappingURL=StationDao.js.map
