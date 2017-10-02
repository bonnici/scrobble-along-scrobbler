/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import scrap = require("./Scraper");
import song = require("../Song");

import winston = require("winston");
import twitter = require('twitter');

export class TwitterScraper extends scrap.Scraper {
    private client: any;
    private prefix = "Now Playing: ";
    private separator = " - ";
    
    constructor(name:string, consumerKey:string, consumerSecret:string, accessTokKey:string, accessTokSecret:string) {
        super(name);
        
        this.client = new twitter({
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            access_token_key: accessTokKey,
            access_token_secret: accessTokSecret
        });
    }

    public fetchAndParse(callback: (err, newNowPlayingSong: song.Song, justScrobbledSong?:song.Song) => void, scraperParam?:string): void {
        const params = {screen_name: scraperParam, count: 1};
        this.client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (error || tweets.length < 1) {
                callback(null, { Artist: null, Track: null });
                return;
            }

            const tweet = tweets[0];
            const date = new Date(tweet.created_at);

            if (date.getTime() < (new Date().getTime() - 30*60*1000)) {
                callback(null, { Artist: null, Track: null });
                return;
            }

            const data = this.parseTweet(tweet.text);

            if (data && data.artist && data.track) {
                callback(null, { Artist: data.artist, Track: data.track });
            }
            else {
                callback(null, { Artist: null, Track: null });
            }
        });
    }

    private parseTweet(text: string):any {
        if (text.indexOf(this.prefix) !== 0) {
            return null;
        }

        text = text.substr(this.prefix.length);
        const split = text.split(this.separator);

        if (split && split.length > 1) {
            return { artist: split[0], track: split[1] };
        }
        else {
            return null;
        }
    }
}