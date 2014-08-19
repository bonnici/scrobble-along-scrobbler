/// <reference path="./definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="./definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="./definitions/typescript-node-definitions/winston.d.ts"/>

import crypt = require("./common/Crypter");
import s = require("./Station");
import song = require("./Song");

import _ = require("underscore");
import mongodb = require("mongodb");
import winston = require("winston");

export interface StationDao {
	getStations(callback:(err, stations:s.Station[]) => void): void;
	updateStationNowPlayingSong(stationName:string, song:song.Song, callback:(err) => void): void;
	updateStationLastPlayedSong(stationName:string, song:song.Song, callback:(err) => void): void;
}

export class DummyStationDao implements StationDao {
	getStations(callback:(err, stations:s.Station[]) => void): void {
		callback(null, [
			{ StationName: "Station1", ScraperName: "Scraper1", Session: "" },
			{ StationName: "Station1", ScraperName: "Scraper2", Session: "" },
			{ StationName: "Station1", ScraperName: "Scraper1", Session: "" }
		]);
	}

	updateStationNowPlayingSong(stationName:string, song:song.Song, callback:(err) => void): void {
		callback(null);
	}
	
	updateStationLastPlayedSong(stationName:string, song:song.Song, callback:(err) => void): void {
		callback(null);
	}
}

export class MongoStationDao implements StationDao {

	constructor (private dbClient: mongodb.Db, private crypter: crypt.Crypter) { }

	getStations(callback:(err, stations:s.Station[]) => void): void {
		if (!this.dbClient || !this.crypter) {
			callback("Invalid DAO setup", null);
			return;
		}

		this.dbClient.collection('station', (error, collection) => {
			if (error) {
				callback(error, null);
				return;
			}

			collection.find().toArray((err, results) => {
				if (err) {
					callback(error, null);
					return;
				}

				var stations = [];
				_.each(results, (record:any) => {
					if (!record._id || !record.parser) {
						winston.error("Invalid station record found in DB:", record);
					}
					else {
						var station:s.Station = { 
							StationName: record._id,
							ScraperName: record.parser,
							ScraperParam: record.scraperParam,
							Session: record.session ? this.crypter.decrypt(record.session) : null,
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
	}

	updateStationNowPlayingSong(stationName: string, song:song.Song, callback:(err) => void): void {
		if (!song) {
			callback("Invalid song");
			return;
		}
		
		this.doUpdateStationSong(stationName, { nowPlayingArtist: song.Artist, nowPlayingTrack: song.Track }, callback);
	}

	updateStationLastPlayedSong(stationName: string, song:song.Song, callback:(err) => void): void {
		if (!song || !song.Artist || !song.Track) {
			callback("Invalid song");
			return;
		}
		
		this.doUpdateStationSong(stationName, { lastPlayedArtist: song.Artist, lastPlayedTrack: song.Track }, callback);
	}

	doUpdateStationSong(stationName: string, updateFields: any, callback:(err) => void): void {
		if (!this.dbClient) {
			callback("Invalid DAO setup");
			return;
		}

		this.dbClient.collection('station', function (error, collection) {
			collection.findAndModify(
				{ _id: stationName },
				[['_id', 'asc']],
				{ $set: updateFields },
				callback
			);
		});
		
	}
}