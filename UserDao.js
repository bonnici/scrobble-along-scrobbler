/// <reference path="../definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>



var _ = require("underscore");

var winston = require("winston");

var DummyUserDao = (function () {
    function DummyUserDao() {
    }
    DummyUserDao.prototype.getUsersListeningToStation = function (station, callback) {
        if (station == "Station1") {
            callback(null, [
                { UserName: "User1", Session: "" },
                { UserName: "User2", Session: "" },
                { UserName: "User3", Session: "" }
            ]);
        } else {
            callback(null, [
                { UserName: "User2", Session: "" }
            ]);
        }
    };

    DummyUserDao.prototype.incrementUserScrobble = function (listener, station, callback) {
        callback(null, "ok");
    };
    return DummyUserDao;
})();
exports.DummyUserDao = DummyUserDao;

var MongoUserDao = (function () {
    function MongoUserDao(dbClient, crypter) {
        this.dbClient = dbClient;
        this.crypter = crypter;
    }
    MongoUserDao.prototype.getUsersListeningToStation = function (station, callback) {
        var _this = this;
        if (!this.dbClient || !this.crypter) {
            callback("Invalid DAO setup", null);
            return;
        }

        this.dbClient.collection('user', function (error, collection) {
            if (error) {
                callback(error, null);
                return;
            }

            collection.find({ listening: station }).toArray(function (err, results) {
                if (err) {
                    callback(error, null);
                    return;
                }

                var users = [];
                _.each(results, function (record) {
                    if (!record._id || !record.session) {
                        winston.error("Invalid user record found in DB:", record);
                    } else {
                        var user = {
                            UserName: record._id,
                            Session: record.session ? _this.crypter.decrypt(record.session) : null
                        };
                        winston.info("Found user listening to " + station + ":", user.UserName);
                        users.push(user);
                    }
                });
                callback(null, users);
            });
        });
    };

    MongoUserDao.prototype.incrementUserScrobble = function (listener, station, callback) {
        this.dbClient.collection('user', function (error, collection) {
            if (error) {
                callback(error, null);
                return;
            }

            var incData = {};
            incData['scrobbles.' + station] = 1;
            collection.update({ _id: listener }, { $inc: incData }, function (err) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, "ok");
                }
            });
        });
    };
    return MongoUserDao;
})();
exports.MongoUserDao = MongoUserDao;

//# sourceMappingURL=UserDao.js.map
