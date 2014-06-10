/// <reference path="../definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>

import crypt = require("./common/Crypter");
import u = require("./User");

import _ = require("underscore");
import mongodb = require("mongodb");
import winston = require("winston");

export interface UserDao {
	getUsersListeningToStation(station:string, callback:(err, users:u.User[]) => void): void;
	incrementUserScrobble(listener: string, station: string, callback:(err, string) => void): void;
}

export class DummyUserDao implements UserDao {
	getUsersListeningToStation(station:string, callback:(err, users:u.User[]) => void): void {
		if (station == "Station1") {
			callback(null, [
				{ UserName: "User1", Session: "" },
				{ UserName: "User2", Session: "" },
				{ UserName: "User3", Session: "" }
			]);
		}
		else {
			callback(null, [
				{ UserName: "User2", Session: "" }
			]);
		}
	}

	incrementUserScrobble(listener: string, station: string, callback:(err, string) => void): void {
		callback(null, "ok");
	}
}

export class MongoUserDao implements UserDao {

	constructor (private dbClient: mongodb.Db, private crypter: crypt.Crypter) { }

	getUsersListeningToStation(station:string, callback:(err, users:u.User[]) => void): void {
		if (!this.dbClient || !this.crypter) {
			callback("Invalid DAO setup", null);
			return;
		}

		this.dbClient.collection('user', (error, collection) => {
			if (error) {
				callback(error, null);
				return;
			}

			collection.find({ listening: station }).toArray((err, results) => { 
				if (err) {
					callback(error, null);
					return;
				}

				var users = [];
				_.each(results, (record:any) => {
					if (!record._id || !record.session) {
						winston.error("Invalid user record found in DB:", record);
					}
					else {
						var user = {
							UserName: record._id,
							Session: record.session ? this.crypter.decrypt(record.session) : null
						};
						winston.info("Found user listening to " + station + ":", user.UserName);
						users.push(user);
					}
				});
				callback(null, users);
			});
		});
	}

	incrementUserScrobble(listener: string, station: string, callback:(err, string) => void): void {
		this.dbClient.collection('user', (error, collection) => {
			if (error) {
				callback(error, null);
				return;
			}

			var incData = {};
			incData['scrobbles.' + station] = 1;
			collection.update({ _id: listener }, { $inc: incData }, (err) => {
				if (err) {
					callback(err, null);
				}
				else {
					callback(null, "ok");
				}
			});
		});
	}
}