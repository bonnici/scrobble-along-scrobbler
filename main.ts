/// <reference path="./definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="./definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="./definitions/dummy-definitions/lastfm.d.ts"/>
/// <reference path="./definitions/typescript-node-definitions/winston.d.ts"/>

import _ = require("underscore");
import lastfm = require("lastfm");
import mongodb = require("mongodb");
import winston = require("winston");

import crypt = require("./common/Crypter");
import scrap = require("./scrapers/Scraper");
import scrob = require("./Scrobbler");
import stat = require("./Station");
import statDao = require("./StationDao");
import lfmDao = require("./LastFmDao");
import usr = require("./User");
import usrDao = require("./UserDao");

import chilldab = require("./scrapers/ChillDABScraper");
import hollow = require("./scrapers/HollowEarthScraper");
import kloveAir1 = require("./scrapers/KLoveAir1RadioScraper");
import newtown = require("./scrapers/NewtownRadioScraper");
import nnm = require("./scrapers/NnmScraper");
import radionomy = require("./scrapers/RadionomyScraper");
import wfuv = require("./scrapers/WfuvScraper");
import wzbc = require("./scrapers/WzbcScraper");

import andys80s = require("./scrapers/cheerio/Andys80sScraper");
import bluesdebut = require("./scrapers/cheerio/BluesDebutScraper");
import bristol = require("./scrapers/cheerio/BristolScraper");
import bytefm = require("./scrapers/cheerio/ByteFmScraper");
import c895 = require("./scrapers/cheerio/C895Scraper");
import cbcRadio2 = require("./scrapers/cheerio/CbcRadio2Scraper");
import cbcRadio3 = require("./scrapers/cheerio/CbcRadio3Scraper");
import dawg = require("./scrapers/cheerio/DawgFmScraper");
import drDk = require("./scrapers/cheerio/DrDkScraper");
import fusion = require("./scrapers/cheerio/FusionScraper");
import goldRadio = require("./scrapers/cheerio/GoldRadioScraper");
import jjj = require("./scrapers/cheerio/JjjScraper");
import kcqn = require("./scrapers/cheerio/KcqnScraper");
import kexp = require("./scrapers/cheerio/KexpScraper");
import soma = require("./scrapers/cheerio/SomaScraper");
import theCurrent = require("./scrapers/cheerio/TheCurrentScraper");
import theEnd = require("./scrapers/cheerio/TheEndHtmlScraper");
import tunein = require("./scrapers/cheerio/TuneInScraper");
import wfmu = require("./scrapers/cheerio/WfmuScraper");
import xfm = require("./scrapers/cheerio/XfmScraper");

import amazing = require("./scrapers/json/AmazingRadioScraper");
import chronisch = require("./scrapers/json/ChronischScraper");
import cod = require("./scrapers/json/CoreOfDestructionScraper");
import digMusic = require("./scrapers/json/DigMusicScraper");
import doubleJ = require("./scrapers/json/DoubleJScraper");
import farpastpost = require("./scrapers/json/FarPastPostScraper");
import fip = require("./scrapers/json/FipScraper");
import fluxFm = require("./scrapers/json/FluxFmScraper");
import go963 = require("./scrapers/json/Go963Scraper");
import infinita = require("./scrapers/json/InfinitaScraper");
import kcrwEclectic24 = require("./scrapers/json/KcrwEclectic24Scraper");
import kcrw = require("./scrapers/json/KcrwScraper");
import lfmNoNowPlayingScraper = require("./scrapers/json/LastfmNoNowPlayingScraper");
import lfmScraper = require("./scrapers/json/LastfmScraper");
import mediaStream = require("./scrapers/json/MediaStreamScraper");
import newLfmScraper = require("./scrapers/json/NewLastfmScraper");
import playFm = require("./scrapers/json/PlayFmScraper");
import punkFm = require("./scrapers/json/PunkFmScraper");
import radio2Nl = require("./scrapers/json/Radio2NLScraper");
import rockFm = require("./scrapers/json/RockFmScraper");
import wave965 = require("./scrapers/json/Wave965Scraper");
import wfku = require("./scrapers/json/WfkuScraper");

// Required environment variables
var STATION_CRYPTO_KEY = process.env.SA_STATION_CRYPTO_KEY;
var USER_CRYPTO_KEY = process.env.SA_USER_CRYPTO_KEY;
var MONGO_URI = process.env.SA_MONGO_URI;
var LASTFM_API_KEY = process.env.SA_LASTFM_API_KEY;
var LASTFM_SECRET = process.env.SA_LASTFM_SECRET;
var SHOULD_SCROBBLE = process.env.SA_SHOULD_SCROBBLE;
var NODE_ENV = process.env.NODE_ENV;
var TESTING_MODE = process.env.SA_TESTING_MODE;
var TESTING_MODE_SCRAPERS = process.env.SA_TESTING_MODE_SCRAPERS; // e.g. KEXP,DoubleJ,DrDk|p3

if (!STATION_CRYPTO_KEY || !USER_CRYPTO_KEY || !MONGO_URI || !LASTFM_API_KEY || !LASTFM_SECRET || !SHOULD_SCROBBLE
	|| !NODE_ENV) {
	winston.error("A required environment variable is missing:", process.env);
	process.exit(1);
}

// winston config
var winstonOpts = { timestamp: true }
if (NODE_ENV === 'production') {
	winstonOpts['colorize'] = false;
	winstonOpts['level'] = 'warn';
}
else {
	winstonOpts['colorize'] = true;
	winstonOpts['level'] = 'info';
}
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, winstonOpts);

var interval = 30000; // 30 seconds
var scrapers:{ [index: string]: scrap.Scraper; } = {
	KEXP: new kexp.KexpScraper("KEXP"),
	NNM: new nnm.NnmScraper("NNM"),
	JJJ: new jjj.JjjScraper("JJJ"),
	Unearthed: new jjj.JjjScraper("Unearthed", "http://www.abc.net.au/triplej/feeds/playout/unearthed_playout.xml"),
	SomaIndiePop: new soma.SomaScraper("SomaIndiePop", "indiepop"),
	SomaLush: new soma.SomaScraper("SomaLush", "lush"),
	SomaUnderground80s: new soma.SomaScraper("SomaUnderground80s", "u80s"),
	HollowEarth: new hollow.HollowEarthScraper("HollowEarth"),
	TheEnd: new theEnd.TheEndHtmlScraper("TheEnd"),
	C895: new c895.C895Scraper("C895"),
	KCRWEclectic24: new kcrwEclectic24.KcrwEclectic24Scraper("KCRWEclectic24"),
	KCQN: new kcqn.KcqnScraper("KCQN"),
	Gold: new goldRadio.GoldRadioScraper("Gold"),
	WFMU: new wfmu.WfmuScraper("WFMU"),
	KCRW: new kcrw.KcrwScraper("KCRW"),
	XFM: new xfm.XfmScraper("XFM"),
	PunkFM: new punkFm.PunkFmScraper("PunkFM"),
	Andys80s: new andys80s.Andys80sScraper("Andys80s"),
	WFUV: new wfuv.WfuvScraper("WFUV", "wfuv"),
	FUVAllMusic: new wfuv.WfuvScraper("FUVAllMusic", "hd2"),
	AlternateSide: new wfuv.WfuvScraper("AlternateSide", "hd3"),
	DigMusic: new digMusic.DigMusicScraper("DigMusic"),
	DoubleJ: new doubleJ.DoubleJScraper("DoubleJ"),
	WZBC: new wzbc.WzbcScraper("WZBC"),
	PlayFM: new playFm.PlayFmScraper("PlayFM"),
	ABCJazz: new digMusic.DigMusicScraper("ABCJazz", "http://abcjazz.net.au/player-data.php"),
	TheCurrent: new theCurrent.TheCurrentScraper("TheCurrent"),
	LastFM: new lfmScraper.LastfmScraper("LastFM", LASTFM_API_KEY),
	LastFMIgnoreListening: new lfmNoNowPlayingScraper.LastfmNoNowPlayingScraper("LastFMIgnoreListening", LASTFM_API_KEY),
    NewLastFM: new newLfmScraper.NewLastfmScraper("NewLastFM", LASTFM_API_KEY),
	Infinita: new infinita.InfinitaScraper("Infinita"),
	Oasis: new mediaStream.MediaStreamScraper("Oasis", "5124ed51ed596bde7d000016"),
	Horizonte: new mediaStream.MediaStreamScraper("Horizonte", "5124f1b4ed596bde7d000017"),
	NewtownRadio: new newtown.NewtownRadioScraper("NewtownRadio"),
	Radio2NL: new radio2Nl.Radio2NLScraper("Radio2NL"),
	Air1: new kloveAir1.KLoveAir1RadioScraper("Air1", "2"),
	KLove: new kloveAir1.KLoveAir1RadioScraper("KLove", "1"),
	RadioGente: new mediaStream.MediaStreamScraper("RadioGente", "5075cd6f48ae3e790a000275"),
	Molecula: new mediaStream.MediaStreamScraper("Molecula", "524097f47764d4c42c00000a"),
	Amazing: new amazing.AmazingRadioScraper("Amazing"),
	WFMUDrummer: new wfmu.WfmuScraper("WFMUDrummer", "4"),
	WFMUIchiban: new wfmu.WfmuScraper("WFMUIchiban", "6"),
	WFMUUbu: new wfmu.WfmuScraper("WFMUUbu", "7"),
	WFMUBored: new wfmu.WfmuScraper("WFMUBored", "8"),
	Sonar: new mediaStream.MediaStreamScraper("Sonar", "4f34676f86d21c6572001ab9"),
	RockFM: new rockFm.RockFmScraper("RockFM"),
	FluxFM: new fluxFm.FluxFmScraper("FluxFMRadio"),
	CBCRadio2: new cbcRadio2.CbcRadio2Scraper("CBCRadio2"),
	CBCRadio3: new cbcRadio3.CbcRadio3Scraper("CBCRadio3"),
	WFKUGoth: new wfku.WfkuScraper("WFKUGoth", "wfkugoth"),
	WFKUPerki: new wfku.WfkuScraper("WFKUPerki", "wfkuperki"),
	DawgFM: new dawg.DawgFmScraper("DawgFM"),
    DrDk: new drDk.DrDkScraper("DrDk"),
    CoreOfDestruction: new cod.CoreOfDestructionScraper("CoreOfDestruction"),
    Bristol: new bristol.BristolScraper("Bristol"),
    Fip: new fip.FipScraper("Fip", "http://www.fipradio.fr/sites/default/files/import_si/si_titre_antenne/FIP_player_current.json?_="),
    Chronisch: new chronisch.ChronischScraper("Chronisch"),
    ByteFM: new bytefm.ByteFmScraper("ByteFM"),
    RadyoBabylon: new tunein.TuneInScraper("RadyoBabylon", "Radyo-Babylon-s131728"),
    BluesDebut: new bluesdebut.BluesDebutScraper("BluesDebut"),
    FarPastPost: new farpastpost.FarPastPostScraper("FarPastPost"),
    LeMouv: new fip.FipScraper("LeMouv", "http://www.lemouv.fr/sites/default/files/import_si/si_titre_antenne/leMouv_player_current.json?_="),
    Fusion: new fusion.FusionScraper("Fusion"),
    Go963: new go963.Go963Scraper("Go963"),
    LuvuFm: new radionomy.RadionomyScraper("LuvuFm", "850b8904-2108-4ed7-a01c-dfde83b22ae8"),
    Wave965: new wave965.Wave965Scraper("Wave965"),
    ChillDAB: new chilldab.ChillDABScraper("ChillDAB")
};

var lastfmNode = new lastfm.LastFmNode({
	api_key: LASTFM_API_KEY,
	secret: LASTFM_SECRET,
	useragent: 'scrobblealong/v0.0.1 ScrobbleAlong'
});

var lastFmDao = SHOULD_SCROBBLE == "true" ? new lfmDao.LastFmDaoImpl(lastfmNode) : new lfmDao.DummyLastFmDao();

if (TESTING_MODE == "once" || TESTING_MODE == "continuous") {
	runTestMode(TESTING_MODE == "continuous");
}
else {
	runScrobbler();
}

function runScrobbler() {
	mongodb.connect(MONGO_URI, (err, dbClient) => {
		if (err) {
			winston.err("Error connecting to MongoDB:", err);
			process.exit(1);
		}

		var stationDao = new statDao.MongoStationDao(dbClient, new crypt.CrypterImpl(STATION_CRYPTO_KEY));
		var userDao = new usrDao.MongoUserDao(dbClient, new crypt.CrypterImpl(USER_CRYPTO_KEY));
		var scrobbler = new scrob.Scrobbler(lastFmDao, userDao, stationDao);

		setInterval(() => {
			scrapeAndScrobbleAllStations(stationDao, userDao);
		}, interval);
		scrapeAndScrobbleAllStations(stationDao, userDao);

		function scrapeAndScrobbleAllStations(stationDao, userDao) {
			stationDao.getStations((err, stations:stat.Station[]) => {
				if (err) return; // Assume error logging is done by DAO

				_.each(stations, (station:stat.Station) => {
					if (!station) return; // break

					if (station.Disabled) {
						winston.info("Station " + station.StationName + " is disabled and was skipped");
						return; // break
					}

					userDao.getUsersListeningToStation(station.StationName, (err, users:usr.User[]) => {
						if (err) return; // break

						// Check scrobble timeout for all users
						var now = new Date().getTime();
						var usersLength = users.length;
						while (usersLength--) {
							var user = users[usersLength];
							if (user.ScrobbleTimeoutEnabled && user.ScrobbleTimeoutTime && user.ScrobbleTimeoutTime < now) {
								winston.info("User " + user.UserName + " scrobble timeout has lapsed, setting as not scrobbling");
								users.splice(usersLength, 1);
								userDao.clearUserListening(user.UserName, (err) => {
									if (err) {
										winston.error("Error clearing user " + user.UserName + " as listening");
									}
								});
							}
						}

						scrobbler.scrapeAndScrobble(scrapers[station.ScraperName], station, users);
					});
				});
			});
		}
	});
}

function runTestMode(continuous: boolean) {
	if (!TESTING_MODE_SCRAPERS) {
		winston.error("No scrapers specified");
		return;
	}

	var scraperNameList = TESTING_MODE_SCRAPERS.split(",");

	var stations = [];
	var usersListening:{[index: string]:usr.User[]} = {};

	for (var i = 0; i < scraperNameList.length; i++) {
		var scraperNameAndParam = scraperNameList[i].split("|");
		var scraperName = scraperNameAndParam[0];
		var scraperParam = scraperNameAndParam.length > 0 ? scraperNameAndParam[1] : null;

		stations.push({
			StationName: scraperName + "Station",
			ScraperName: scraperName,
			Session: scraperName + "Session",
			ScraperParam: scraperParam
		});

		usersListening[scraperName] = [
			{ UserName: scraperName + "Listener1", Session: scraperName + "Listener1Session" },
			{ UserName: scraperName + "Listener2", Session: scraperName + "Listener2Session" }
		];
	}

	var lastFmDao = new lfmDao.DummyLastFmDao();
	var userDao = new usrDao.DummyUserDao();
	var scrobbler = new scrob.Scrobbler(lastFmDao, userDao);

	if (continuous) {
		setInterval(() => { testScrapeAndScrobble(); }, interval);
	}
	testScrapeAndScrobble();

	function testScrapeAndScrobble() {
		_.each(stations, (station:stat.Station) => {
			if (station) {
				scrobbler.scrapeAndScrobble(scrapers[station.ScraperName], station, usersListening[station.ScraperName]);
			}
		});
	};
}