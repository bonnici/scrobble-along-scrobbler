/// <reference path="./definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="./definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
var _ = require("underscore");
var winston = require("winston");
// Constants
var LAST_UPDATE_TIMEOUT = 60 * 1000; // Amount of time failures can occur before the song that was playing is scrobbled
var MIN_SCROBBLE_TIME = 35 * 1000; // The minimum time a song has to play before it can be scrobbled
var ScrobblerStationData = (function () {
    function ScrobblerStationData(stationName) {
        this.stationName = stationName, this.nowPlayingSong = { Artist: null, Track: null };
        this.lastScrobbledSong = null;
        this.lastUpdatedTime = null;
    }
    return ScrobblerStationData;
})();
;
var Scrobbler = (function () {
    function Scrobbler(lastFmDao, userDao, stationDao) {
        this.lastFmDao = lastFmDao;
        this.userDao = userDao;
        this.stationDao = stationDao;
        this.stationData = {};
    }
    Scrobbler.prototype.scrapeAndScrobble = function (scraper, station, users, timestamp) {
        var _this = this;
        timestamp = timestamp || new Date().getTime();
        if (!scraper) {
            winston.error("Attempted to process invalid scraper:", { scraper: scraper, station: station });
            return;
        }
        if (!station || !station.StationName) {
            winston.error("Attempted to process invalid station:", station);
            return;
        }
        var stationName = station.StationName;
        var stationData = this.stationData[stationName];
        if (!stationData) {
            winston.info("New station found, initializing:", stationName);
            stationData = new ScrobblerStationData(stationName);
            this.stationData[stationName] = stationData;
        }
        var cb = function (err, newNowPlayingSong, justScrobbledSong) {
            if (err) {
                winston.error("Error scraping " + stationName + ": " + err);
                if (_this.lastUpdatedTooLongAgo(stationData, timestamp)) {
                    _this.scrobbleNowPlayingIfValid(stationData, null, station, users);
                    stationData.nowPlayingSong = { Artist: null, Track: null, StartTime: timestamp };
                    stationData.lastUpdatedTime = null;
                }
                return;
            }
            stationData.lastUpdatedTime = timestamp;
            // justScrobbledSong should be set if the scraper might not be able to figure out what is currently playing
            if (justScrobbledSong) {
                justScrobbledSong.StartTime = new Date().getTime();
                _this.scrobbleNowPlayingIfValid(stationData, justScrobbledSong, station, users);
                // If both justScrobbledSong and newNowPlayingSong are set, only update now playing with
                // newNowPlayingSong, don't ever scrobble that
                if (newNowPlayingSong) {
                    stationData.nowPlayingSong = {
                        Artist: newNowPlayingSong.Artist,
                        Track: newNowPlayingSong.Track,
                        StartTime: timestamp
                    };
                    _this.postNowPlayingIfValid(stationData, station, users);
                }
            }
            else {
                if (!newNowPlayingSong || !stationData.nowPlayingSong || newNowPlayingSong.Artist != stationData.nowPlayingSong.Artist || newNowPlayingSong.Track != stationData.nowPlayingSong.Track) {
                    _this.scrobbleNowPlayingIfValid(stationData, null, station, users);
                    stationData.nowPlayingSong = {
                        Artist: newNowPlayingSong.Artist,
                        Track: newNowPlayingSong.Track,
                        StartTime: timestamp
                    };
                }
                _this.postNowPlayingIfValid(stationData, station, users);
            }
        };
        scraper.fetchAndParse(cb, station.ScraperParam);
    };
    Scrobbler.prototype.lastUpdatedTooLongAgo = function (stationData, timestamp) {
        return stationData.lastUpdatedTime && (stationData.lastUpdatedTime - timestamp < LAST_UPDATE_TIMEOUT);
    };
    Scrobbler.prototype.scrobbleNowPlayingIfValid = function (stationData, songToScrobble, station, users) {
        var _this = this;
        if (!songToScrobble) {
            songToScrobble = stationData.nowPlayingSong;
            // If we are scrobbling the now playing song, check play time
            if (!songToScrobble.StartTime || !stationData.lastUpdatedTime || stationData.lastUpdatedTime - songToScrobble.StartTime <= MIN_SCROBBLE_TIME) {
                return;
            }
        }
        // Check song details
        if (!(songToScrobble && songToScrobble.Artist && songToScrobble.Track)) {
            return;
        }
        // Make sure it's not the same as the one we scrobbled last
        if (songToScrobble != null && stationData.lastScrobbledSong != null && songToScrobble.Artist == stationData.lastScrobbledSong.Artist && songToScrobble.Track == stationData.lastScrobbledSong.Track) {
            return;
        }
        stationData.lastScrobbledSong = { Artist: songToScrobble.Artist, Track: songToScrobble.Track };
        if (station.Session) {
            this.lastFmDao.scrobble(songToScrobble, station.StationName, station.Session);
        }
        _.each(users, function (user) {
            if (user) {
                _this.lastFmDao.scrobble(songToScrobble, user.UserName, user.Session);
                _this.userDao.incrementUserScrobble(user.UserName, station.StationName, function (err, status) {
                    if (err) {
                        winston.info("Error incrementing scrobble count for user " + user.UserName + " and station " + station.StationName + ":", err);
                    }
                    else {
                        winston.info("Incremented scrobble count for user " + user.UserName + " and station " + station.StationName);
                    }
                });
            }
        });
        if (this.stationDao) {
            this.stationDao.updateStationLastPlayedSong(station.StationName, songToScrobble, function (err) {
                if (err) {
                    winston.error("Error updating " + station.StationName + " last played song", songToScrobble);
                }
            });
        }
    };
    Scrobbler.prototype.postNowPlayingIfValid = function (stationData, station, users) {
        var _this = this;
        if (!(stationData.nowPlayingSong)) {
            return;
        }
        if (this.stationDao) {
            this.stationDao.updateStationNowPlayingSong(station.StationName, stationData.nowPlayingSong, function (err) {
                if (err) {
                    winston.error("Error updating " + station.StationName + " now playing song", stationData.nowPlayingSong);
                }
            });
        }
        if (!stationData.nowPlayingSong.Artist || !stationData.nowPlayingSong.Track) {
            return;
        }
        if (station.Session) {
            this.lastFmDao.postNowPlaying(stationData.nowPlayingSong, station.StationName, station.Session);
        }
        _.each(users, function (user) {
            if (user) {
                _this.lastFmDao.postNowPlaying(stationData.nowPlayingSong, user.UserName, user.Session);
            }
        });
    };
    return Scrobbler;
})();
exports.Scrobbler = Scrobbler;
//# sourceMappingURL=Scrobbler.js.map