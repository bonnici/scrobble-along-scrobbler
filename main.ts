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
//import belly = require("./scrapers/BellyUp4BluesScraper");
import noesfm = require("./scrapers/NoEsFmScraper");
import marci = require("./scrapers/MarciScraper");
import theCurrent = require("./scrapers/TheCurrentScraper");
import twitter = require("./scrapers/TwitterScraper");

import andys80s = require("./scrapers/cheerio/Andys80sScraper");
import bluesdebut = require("./scrapers/cheerio/BluesDebutScraper");
import bristol = require("./scrapers/cheerio/BristolScraper");
//import bytefm = require("./scrapers/cheerio/ByteFmScraper");
import c895 = require("./scrapers/cheerio/C895Scraper");
//import cbcRadio2 = require("./scrapers/cheerio/CbcRadio2Scraper");
//import cbcRadio3 = require("./scrapers/cheerio/CbcRadio3Scraper");
import dawg = require("./scrapers/cheerio/DawgFmScraper");
import drDk = require("./scrapers/cheerio/DrDkScraper");
import fusion = require("./scrapers/cheerio/FusionScraper");
import goldRadio = require("./scrapers/cheerio/GoldRadioScraper");
import jjj = require("./scrapers/cheerio/JjjScraper");
import kcqn = require("./scrapers/cheerio/KcqnScraper");
import kexp = require("./scrapers/cheerio/KexpScraper");
import soma = require("./scrapers/cheerio/SomaScraper");
//import theCurrent = require("./scrapers/cheerio/TheCurrentScraper");
import theEnd = require("./scrapers/cheerio/TheEndHtmlScraper");
import tunein = require("./scrapers/cheerio/TuneInScraper");
import wfmu = require("./scrapers/cheerio/WfmuScraper");
import xfm = require("./scrapers/cheerio/XfmScraper");
import wave965Html = require("./scrapers/cheerio/Wave965HtmlScraper");
import vodafone = require("./scrapers/cheerio/VodafoneFmScraper");
import spiff = require("./scrapers/cheerio/SpiffRadioScraper");
import wmbr = require("./scrapers/cheerio/WmbrScraper");
//import raveo = require("./scrapers/cheerio/RaveoScraper");
import belly = require("./scrapers/cheerio/BellyUp4BluesScraper");
import nexus = require("./scrapers/cheerio/NexusScraper");
import gensokyo = require("./scrapers/cheerio/GensokyoRadioScraper");
import krautrock = require("./scrapers/cheerio/KrautrockWorld");

import amazing = require("./scrapers/json/AmazingRadioScraper");
import chronisch = require("./scrapers/json/ChronischScraper");
import cod = require("./scrapers/json/CoreOfDestructionScraper");
import digMusic = require("./scrapers/json/DigMusicScraper");
import doubleJ = require("./scrapers/json/DoubleJScraper");
import farpastpost = require("./scrapers/json/FarPastPostScraper");
import fip = require("./scrapers/json/FipScraper");
import fluxFm = require("./scrapers/json/FluxFmScraper");
import go963 = require("./scrapers/Go963Scraper");
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
import kfjc = require("./scrapers/json/KfjcScraper");
import allsongs = require("./scrapers/json/AllSongs247Scraper");
import xray = require("./scrapers/json/XrayScraper");
import janus = require("./scrapers/json/JanusScraper");
import kgsr = require("./scrapers/json/KGSRScraper");
import bytefm = require("./scrapers/json/ByteFmJsonScraper");
import sixforty = require("./scrapers/json/SixFortyScraper");
import cpr = require("./scrapers/json/CprScraper");
import radioRiel = require("./scrapers/json/RadioRielScraper");
import radioNova = require("./scrapers/json/RadioNovaScraper");
import megaStarFm = require("./scrapers/json/MegaStarFmScraper");
import radioU = require("./scrapers/json/RadioUScraper");
import los40 = require("./scrapers/json/Los40Scraper");
import cbcRadio = require("./scrapers/json/CbcRadioScraper");
import kiis = require("./scrapers/json/Kiis1065Scraper");
import newKexp = require("./scrapers/json/NewKexpScraper");
import qRadio = require("./scrapers/json/QRadioScraper");
import rockAxis = require("./scrapers/json/RockAxisScraper");
import chipbit = require("./scrapers/json/ChipbitScraper");
import oldFashionedRadio = require("./scrapers/json/OFRScraper");
import humanoDerecho = require("./scrapers/json/HumanoDerechoScraper");
import wwoz = require("./scrapers/json/WWOZScraper");
import gnl = require("./scrapers/json/GnlScraper");


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
var TESTING_MODE_USE_LISTENERS = process.env.SA_TESTING_MODE_USE_LISTENERS;
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
var TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN_KEY;
var TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

if (!STATION_CRYPTO_KEY || !USER_CRYPTO_KEY || !MONGO_URI || !LASTFM_API_KEY || !LASTFM_SECRET || !SHOULD_SCROBBLE
	|| !NODE_ENV || !TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET || !TWITTER_ACCESS_TOKEN_KEY || !TWITTER_ACCESS_TOKEN_SECRET) {
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

// All times are in seconds
var newSongCheckInterval = 30; // How often the scrapers should check for a new song

// When a new song is found, it is posted as now playing for this long
var postNowPlayingLength = 5*60;

// We should skip posting now playing if the same song was already posted within this time frame.
// This is timed so that we definitely post a now playing before the last post expires.
var skipPostNowPlayingTime = postNowPlayingLength - newSongCheckInterval - 1;

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
    PlayFM: new janus.JanusScraper("PlayFM", "playfm"),
    ABCJazz: new doubleJ.DoubleJScraper("ABCJazz", "http://music.abcradio.net.au/api/v1/plays/jazz/now.json"),
	TheCurrent: new theCurrent.TheCurrentScraper("TheCurrent"),
	LastFM: new lfmScraper.LastfmScraper("LastFM", LASTFM_API_KEY),
	LastFMIgnoreListening: new lfmNoNowPlayingScraper.LastfmNoNowPlayingScraper("LastFMIgnoreListening", LASTFM_API_KEY),
    NewLastFM: new newLfmScraper.NewLastfmScraper("NewLastFM", LASTFM_API_KEY),
	Infinita: new infinita.InfinitaScraper("Infinita"),
    Oasis: new janus.JanusScraper("Oasis", "oasisfm"),
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
    Sonar: new janus.JanusScraper("Sonar", "sonarfm"),
	RockFM: new rockFm.RockFmScraper("RockFM"),
	FluxFM: new fluxFm.FluxFmScraper("FluxFMRadio"),
	//CBCRadio2: new cbcRadio2.CbcRadio2Scraper("CBCRadio2"),
	//CBCRadio3: new cbcRadio3.CbcRadio3Scraper("CBCRadio3"),
	WFKUGoth: new wfku.WfkuScraper("WFKUGoth", "wfkugoth"),
	WFKUPerki: new wfku.WfkuScraper("WFKUPerki", "wfkuperki"),
	DawgFM: new dawg.DawgFmScraper("DawgFM"),
    DrDk: new drDk.DrDkScraper("DrDk"),
    CoreOfDestruction: new cod.CoreOfDestructionScraper("CoreOfDestruction"),
    Bristol: new bristol.BristolScraper("Bristol"),
    Fip: new fip.FipScraper("Fip", "http://www.fipradio.fr/sites/default/files/import_si/si_titre_antenne/FIP_player_current.json?_="),
    Chronisch: new chronisch.ChronischScraper("Chronisch"),
    //ByteFM: new bytefm.ByteFmScraper("ByteFM"),
    ByteFM: new bytefm.ByteFmJsonScraper("ByteFM"),
    RadyoBabylon: new tunein.TuneInScraper("RadyoBabylon", "Radyo-Babylon-s131728"),
    BluesDebut: new bluesdebut.BluesDebutScraper("BluesDebut"),
    FarPastPost: new farpastpost.FarPastPostScraper("FarPastPost"),
    LeMouv: new fip.FipScraper("LeMouv", "http://www.lemouv.fr/sites/default/files/import_si/si_titre_antenne/leMouv_player_current.json?_="),
    Fusion: new fusion.FusionScraper("Fusion"),
    Go963: new go963.Go963Scraper("Go963"),
    LuvuFm: new radionomy.RadionomyScraper("LuvuFm", "850b8904-2108-4ed7-a01c-dfde83b22ae8"),
    Wave965: new wave965.Wave965Scraper("Wave965"),
    //Wave965: new wave965Html.Wave965HtmlScraper("Wave965"),
    ChillDAB: new chilldab.ChillDABScraper("ChillDAB"),
    KFJC: new kfjc.KfjcScraper("KFJC"),
    AllSongs: new allsongs.AllSongs247Scraper("AllSongs"),
    Xray: new xray.XrayScraper("Xray"),
    //BellyUp4Blues: new belly.BellyUp4BluesScraper("BellyUp4Blues"),
    BellyUp4Blues: new belly.BellyUp4BluesScraper("BellyUp4Blues"),
    GemRadio: new tunein.TuneInScraper("GemRadio", "Gem-Radio-New-Wave-s183330"),
    KGSR: new kgsr.KGSRScraper("KGSR"),
    NoEsFm: new noesfm.NoEsFmScraper("NoEsFm"),
    VodafoneFm: new vodafone.VodafoneFmScraper("VodafoneFm"),
    DriveRadio: new radionomy.RadionomyScraper("DriveRadio", "e962db7e-2a01-40d2-99a8-c1c66b5fa64c"),
    SixForty: new sixforty.SixFortyScraper("SixForty"),
    KLFM: new marci.MarciScraper("KLFM", "451"),
    Beats1: new spiff.SpiffRadioScraper("Beats1", "beats-1"),
    Spiff: new spiff.SpiffRadioScraper("Spiff"),
    WMBR: new wmbr.WmbrScraper("WMBR"),
    GNL: new gnl.GnlScraper("GNLRadio"),
    CPROpenAir: new cpr.CprScraper("CPROpenAir", "playlistCO"),
    RadioRiel: new radioRiel.RadioRielScraper("RadioRiel"),
    RadioNova: new radioNova.RadioNovaScraper("RadioNova"),
    MegaStarFm: new megaStarFm.MegaStarFmScraper("MegaStarFM"),
    RadioU: new radioU.RadioUScraper("RadioU"),
    Gensokyo: new gensokyo.GensokyoRadioScraper("Gensokyo"),
    Los40: new los40.Los40Scraper("Los40"),
    NexusAlt: new nexus.NexusScraper("Nexus", "http://alt360radio.com/load/title/nowplaying-wordpress.php", true),
    NexusDance: new nexus.NexusScraper("Nexus", "http://nexusradio.fm/load/title/nowplaying-page.php", false),
    NexusJamz: new nexus.NexusScraper("Nexus", "http://party1019.com/load/title/nowplaying-wordpress.php", true),
    NexusLatin: new nexus.NexusScraper("Nexus", "http://nexuslatino.com/load/title/nowplaying-white.php", false),
    NexusPop: new nexus.NexusScraper("Nexus", "http://nexusradio.fm/load/pop/title/nowplaying-white.php", false),
    NexusRaveo: new nexus.NexusScraper("Nexus", "http://raveo.fm/load/title/nowplaying-wordpress.php", true),
    CbcRadio : new cbcRadio.CbcRadioScraper("CbcRadio"),
    Kiis1065Scraper: new kiis.Kiis1065Scraper("Kiis1065"),
    NewKexp: new newKexp.NewKexpScraper("NewKexp"),
    QRadio: new qRadio.QRadioScraper("qradiobelfast"),
    RockAxis: new rockAxis.RockAxisScraper("RockAxisRadio"),
    ChipBit: new chipbit.ChipbitScraper("ChipBitRadio"),
    OFR: new oldFashionedRadio.OFRScraper("OFR"),
    Twitter: new twitter.TwitterScraper("Twitter", TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET),
    Krautrock: new krautrock.KrautrockWorldScraper("KrautrockWorld"),
    HumanoDerecho: new humanoDerecho.HumanoDerechoScraper("HumanoDerecho"),
    WWOZ: new wwoz.WWOZScraper("WWOZ")
};

var lastfmNode = new lastfm.LastFmNode({
	api_key: LASTFM_API_KEY,
	secret: LASTFM_SECRET,
	useragent: 'scrobblealong/v0.0.1 ScrobbleAlong'
});

var lastFmDao = SHOULD_SCROBBLE == "true" ? new lfmDao.LastFmDaoImpl(lastfmNode, postNowPlayingLength) : new lfmDao.DummyLastFmDao();

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
		var scrobbler = new scrob.Scrobbler(lastFmDao, userDao, stationDao, skipPostNowPlayingTime);

		setInterval(() => {
			scrapeAndScrobbleAllStations(stationDao, userDao);
		}, newSongCheckInterval * 1000);
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

        if (TESTING_MODE_USE_LISTENERS == "true") {
            usersListening[scraperName] = [
                {UserName: scraperName + "Listener1", Session: scraperName + "Listener1Session"},
                {UserName: scraperName + "Listener2", Session: scraperName + "Listener2Session"}
            ];
        }
	}

	var userDao = new usrDao.DummyUserDao();
	var scrobbler = new scrob.Scrobbler(lastFmDao, userDao, null, skipPostNowPlayingTime);

	if (continuous) {
		setInterval(() => { testScrapeAndScrobble(); }, newSongCheckInterval * 1000);
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