/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../definitions/dummy-definitions/lastfm.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>


var _ = require("underscore");

var winston = require("winston");

var DummyLastFmDao = (function () {
    function DummyLastFmDao() {
    }
    DummyLastFmDao.prototype.postNowPlaying = function (song, lastFmUsername, session, callback) {
        callback = callback || (function () {
        });

        if (song.Artist && song.Track) {
            winston.info("Faking post now playing to user " + lastFmUsername + ", session " + session + " of song:", song);
            callback(null, "OK");
        } else {
            callback("Invalid song", null);
        }
    };

    DummyLastFmDao.prototype.scrobble = function (song, lastFmUsername, session, callback) {
        callback = callback || (function () {
        });

        if (song.Artist && song.Track) {
            winston.info("Faking scrobble to user " + lastFmUsername + ", session " + session + " of song:", song);
            callback(null, "OK");
        } else {
            callback("Invalid song", null);
        }
    };
    return DummyLastFmDao;
})();
exports.DummyLastFmDao = DummyLastFmDao;

var LastFmDaoImpl = (function () {
    function LastFmDaoImpl(lastfmNode) {
        this.lastfmNode = lastfmNode;
        this.POST_NOW_PLAYING_DURATION = 40;
    }
    LastFmDaoImpl.prototype.postNowPlaying = function (song, lastFmUsername, sessionKey, callback) {
        callback = callback || (function () {
        });

        if (!song || !song.Artist || !song.Track || !lastFmUsername || !sessionKey) {
            winston.error("postNowPlaying invalid parameters:", { song: song, lastFmUsername: lastFmUsername, sessionKey: sessionKey });
            callback("Invalid parameters", null);
            return;
        }

        var updateOptions = {
            artist: song.Artist,
            track: song.Track,
            duration: this.POST_NOW_PLAYING_DURATION,
            handlers: {
                success: function (data) {
                    winston.info("Success posting now playing for " + lastFmUsername, song);
                    callback(null, "OK");
                },
                error: function (error) {
                    winston.error("Error posting now playing for " + lastFmUsername, error.message);
                    callback(error, null);
                }
            }
        };

        var session = this.lastfmNode.session(lastFmUsername, sessionKey);
        this.lastfmNode.update('nowplaying', session, updateOptions);
    };

    LastFmDaoImpl.prototype.scrobble = function (song, lastFmUsername, sessionKey, callback) {
        callback = callback || (function () {
        });

        if (!song || !song.Artist || !song.Track || !lastFmUsername || !sessionKey) {
            winston.error("scrobble invalid parameters:", { song: song, lastFmUsername: lastFmUsername, sessionKey: sessionKey });
            callback("Invalid parameters", null);
            return;
        }

        var updateOptions = {
            artist: song.Artist,
            track: song.Track,
            timestamp: Math.round(song.StartTime / 1000),
            handlers: {
                success: function (data) {
                    winston.info("Success posting scrobble for " + lastFmUsername, song);
                    callback(null, "OK");
                },
                error: function (error) {
                    winston.error("Error posting scrobble for " + lastFmUsername, error.message);
                    callback(error, null);
                }
            }
        };

        var session = this.lastfmNode.session(lastFmUsername, sessionKey);
        this.lastfmNode.update('scrobble', session, updateOptions);
    };
    return LastFmDaoImpl;
})();
exports.LastFmDaoImpl = LastFmDaoImpl;

//# sourceMappingURL=LastFmDao.js.map
