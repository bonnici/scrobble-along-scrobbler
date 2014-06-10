/// <reference path="../definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import crypt = require("./common/Crypter");
import s = require("./Station");

import _ = require("underscore");
import mongodb = require("mongodb");
import winston = require("winston");

export interface StationDao {
	getStations(callback:(err, stations:s.Station[]) => void): void;
}

export class DummyStationDao implements StationDao {
	getStations(callback:(err, stations:s.Station[]) => void): void {
		callback(null, [
			{ StationName: "Station1", ScraperName: "Scraper1", Session: "" },
			{ StationName: "Station1", ScraperName: "Scraper2", Session: "" },
			{ StationName: "Station1", ScraperName: "Scraper1", Session: "" }
		]);
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
						var station = { 
							StationName: record._id,
							ScraperName: record.parser,
							ScraperParam: record.scraperParam,
							Session: record.session ? this.crypter.decrypt(record.session) : null,
							Disabled: record.disabled ? ("true" == record.disabled) : false
						};
						winston.info("loaded station from DB", station.StationName);
						stations.push(station);
					}
				});
				callback(null, stations);
			});
		});
	}
}