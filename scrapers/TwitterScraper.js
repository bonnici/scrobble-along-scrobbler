"use strict";
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var scrap = require("./Scraper");
var twitter = require("twitter");
var TwitterScraper = (function (_super) {
    __extends(TwitterScraper, _super);
    function TwitterScraper(name, consumerKey, consumerSecret, accessTokKey, accessTokSecret) {
        var _this = _super.call(this, name) || this;
        _this.client = new twitter({
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            access_token_key: accessTokKey,
            access_token_secret: accessTokSecret
        });
        return _this;
    }
    TwitterScraper.prototype.fetchAndParse = function (callback, scraperParam) {
        var _this = this;
        var params = { screen_name: scraperParam, count: 1 };
        this.client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error || tweets.length < 1) {
                callback(null, { Artist: null, Track: null });
                return;
            }
            var tweet = tweets[0];
            var date = new Date(tweet.created_at);
            if (date.getTime() < (new Date().getTime() - 30 * 60 * 1000)) {
                callback(null, { Artist: null, Track: null });
                return;
            }
            var data = _this.parseTweet(tweet.text);
            if (data && data.artist && data.track) {
                callback(null, { Artist: data.artist, Track: data.track });
            }
            else {
                callback(null, { Artist: null, Track: null });
            }
        });
    };
    TwitterScraper.prototype.parseTweet = function (text) {
        var prefix = "Now Playing: ";
        var endIndex = null;
        var separator = " - ";
        // Detect SomaFM accounts. Should be done in a better way.
        if (text.indexOf('♬') >= 0) {
            prefix = '♬ ';
            endIndex = text.lastIndexOf('♬') - 1;
        }
        if (text.indexOf(prefix) !== 0) {
            return null;
        }
        if (endIndex) {
            text = text.substring(0, endIndex);
        }
        text = text.substring(prefix.length);
        var split = text.split(separator);
        if (split && split.length > 1) {
            return { artist: split[0], track: split[1] };
        }
        else {
            return null;
        }
    };
    return TwitterScraper;
}(scrap.Scraper));
exports.TwitterScraper = TwitterScraper;
//# sourceMappingURL=TwitterScraper.js.map