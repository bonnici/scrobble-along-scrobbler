/// <reference path="./definitions/DefinitelyTyped/mongodb/mongodb.d.ts"/>
/// <reference path="./definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="./definitions/dummy-definitions/lastfm.d.ts"/>
/// <reference path="./definitions/typescript-node-definitions/winston.d.ts"/>
var _ = require("underscore");
var lastfm = require("lastfm");
var mongodb = require("mongodb");
var winston = require("winston");

var crypt = require("./common/Crypter");

var scrob = require("./Scrobbler");

var statDao = require("./StationDao");
var lfmDao = require("./LastFmDao");

var usrDao = require("./UserDao");

var kexp = require("./scrapers/KexpScraper");
var nnm = require("./scrapers/NnmScraper");
var jjj = require("./scrapers/JjjScraper");
var soma = require("./scrapers/SomaScraper");
var hollow = require("./scrapers/HollowEarthScraper");
var theEnd = require("./scrapers/TheEndHtmlScraper");
var c895 = require("./scrapers/C895Scraper");
var kcrwEclectic24 = require("./scrapers/KcrwEclectic24Scraper");
var kcqn = require("./scrapers/KcqnScraper");
var goldRadio = require("./scrapers/GoldRadioScraper");
var wfmu = require("./scrapers/WfmuScraper");
var kcrw = require("./scrapers/KcrwScraper");
var xfm = require("./scrapers/XfmScraper");
var punkFm = require("./scrapers/PunkFmScraper");
var andys80s = require("./scrapers/Andys80sScraper");
var wfuv = require("./scrapers/WfuvScraper");
var digMusic = require("./scrapers/DigMusicScraper");
var wzbc = require("./scrapers/WzbcScraper");
var playFm = require("./scrapers/PlayFmScraper");
var theCurrent = require("./scrapers/TheCurrentScraper");
var lfmScraper = require("./scrapers/LastfmScraper");
var lfmNoNowPlayingScraper = require("./scrapers/LastfmNoNowPlayingScraper");
var newLfmScraper = require("./scrapers/NewLastfmScraper");
var infinita = require("./scrapers/InfinitaScraper");
var mediaStream = require("./scrapers/MediaStreamScraper");
var newtown = require("./scrapers/NewtownRadioScraper");
var radio2Nl = require("./scrapers/Radio2NLScraper");
var kloveAir1 = require("./scrapers/KLoveAir1RadioScraper");
var doubleJ = require("./scrapers/DoubleJScraper");
var amazing = require("./scrapers/AmazingRadioScraper");
var rockFm = require("./scrapers/RockFmScraper");
var fluxFm = require("./scrapers/FluxFmScraper");
var cbcRadio2 = require("./scrapers/CbcRadio2Scraper");
var cbcRadio3 = require("./scrapers/CbcRadio3Scraper");
var wfku = require("./scrapers/WfkuScraper");
var dawg = require("./scrapers/DawgFmScraper");
var drDk = require("./scrapers/DrDkScraper");
var cod = require("./scrapers/CoreOfDestructionScraper");
var bristol = require("./scrapers/BristolScraper");
var fip = require("./scrapers/FipScraper");
var chronisch = require("./scrapers/ChronischScraper");
var bytefm = require("./scrapers/ByteFmScraper");
var tunein = require("./scrapers/TuneInScraper");

// Required environment variables
var STATION_CRYPTO_KEY = process.env.SA_STATION_CRYPTO_KEY;
var USER_CRYPTO_KEY = process.env.SA_USER_CRYPTO_KEY;
var MONGO_URI = process.env.SA_MONGO_URI;
var LASTFM_API_KEY = process.env.SA_LASTFM_API_KEY;
var LASTFM_SECRET = process.env.SA_LASTFM_SECRET;
var SHOULD_SCROBBLE = process.env.SA_SHOULD_SCROBBLE;
var NODE_ENV = process.env.NODE_ENV;

if (!STATION_CRYPTO_KEY || !USER_CRYPTO_KEY || !MONGO_URI || !LASTFM_API_KEY || !LASTFM_SECRET || !SHOULD_SCROBBLE || !NODE_ENV) {
    winston.error("A required environment variable is missing:", process.env);
    process.exit(1);
}

// winston config
var winstonOpts = { timestamp: true };
if (NODE_ENV === 'production') {
    winstonOpts['colorize'] = false;
    winstonOpts['level'] = 'warn';
} else {
    winstonOpts['colorize'] = true;
    winstonOpts['level'] = 'info';
}
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, winstonOpts);

var interval = 30000;
var scrapers = {
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
    Fip: new fip.FipScraper("Fip"),
    Chronisch: new chronisch.ChronischScraper("Chronisch"),
    ByteFM: new bytefm.ByteFmScraper("ByteFM"),
    RadyoBabylon: new tunein.TuneInScraper("RadyoBabylon", "Radyo-Babylon-s131728")
};

//////////////
// Proper scrobbler
//////////////
var lastfmNode = new lastfm.LastFmNode({
    api_key: LASTFM_API_KEY,
    secret: LASTFM_SECRET,
    useragent: 'scrobblealong/v0.0.1 ScrobbleAlong'
});

var lastFmDao = SHOULD_SCROBBLE == "true" ? new lfmDao.LastFmDaoImpl(lastfmNode) : new lfmDao.DummyLastFmDao();

mongodb.connect(MONGO_URI, function (err, dbClient) {
    if (err) {
        winston.err("Error connecting to MongoDB:", err);
        process.exit(1);
    }

    var stationDao = new statDao.MongoStationDao(dbClient, new crypt.CrypterImpl(STATION_CRYPTO_KEY));
    var userDao = new usrDao.MongoUserDao(dbClient, new crypt.CrypterImpl(USER_CRYPTO_KEY));
    var scrobbler = new scrob.Scrobbler(lastFmDao, userDao, stationDao);

    setInterval(function () {
        scrapeAndScrobbleAllStations(stationDao, userDao);
    }, interval);
    scrapeAndScrobbleAllStations(stationDao, userDao);

    function scrapeAndScrobbleAllStations(stationDao, userDao) {
        stationDao.getStations(function (err, stations) {
            if (err)
                return;

            _.each(stations, function (station) {
                if (!station)
                    return;

                if (station.Disabled) {
                    winston.info("Station " + station.StationName + " is disabled and was skipped");
                    return;
                }

                userDao.getUsersListeningToStation(station.StationName, function (err, users) {
                    if (err)
                        return;

                    // Check scrobble timeout for all users
                    var now = new Date().getTime();
                    var usersLength = users.length;
                    while (usersLength--) {
                        var user = users[usersLength];
                        if (user.ScrobbleTimeoutEnabled && user.ScrobbleTimeoutTime && user.ScrobbleTimeoutTime < now) {
                            winston.info("User " + user.UserName + " scrobble timeout has lapsed, setting as not scrobbling");
                            users.splice(usersLength, 1);
                            userDao.clearUserListening(user.UserName, function (err) {
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
//////////////
// Scrobbler that scrapes but does not scrobble or load proper users/stations
//////////////
/*
var stationDao = new statDao.DummyStationDao();
var userDao = new usrDao.DummyUserDao();
var lastFmDao = new lfmDao.DummyLastFmDao();
var scrobbler = new scrob.Scrobbler(lastFmDao);
setInterval(
() => {
stationDao.getStations((err, stations: stat.Station[]) => {
if (err) return; // Assume error logging is done by DAO
_.each(stations, (station:stat.Station) => {
if (!station) return; // break
userDao.getUsersListeningToStation(station.StationName, (err, users:usr.User[]) => {
if (err) return; // break
scrobbler.scrapeAndScrobble(scrapers[station.ScraperName], station, users);
});
});
});
}
, interval);
*/
//////////////
// Scrobbler that scrapes but does not scrobble and uses fake stations & users
//////////////
/*
var stations = [
{ StationName: "KEXP903FM", ScraperName: "KEXP", Session: "KEXP903FMSession" },
{ StationName: "NNM", ScraperName: "NNM", Session: "NNMSession" },
{ StationName: "triplejradio", ScraperName: "JJJ", Session: "triplejradioSession" },
{ StationName: "Unearthed", ScraperName: "Unearthed", Session: "UnearthedSession" },
{ StationName: "SomaIndiePop", ScraperName: "SomaIndiePop", Session: "SomaIndiePopSession" },
{ StationName: "SomaLush", ScraperName: "SomaLush", Session: "SomaLushSession" },
{ StationName: "SomaUnderground80s", ScraperName: "SomaUnderground80s", Session: "SomaUnderground80sSession" },
{ StationName: "HollowEarth", ScraperName: "HollowEarth", Session: "HollowEarthSession" },
{ StationName: "TheEnd", ScraperName: "TheEnd", Session: "TheEndSession" },
{ StationName: "C895", ScraperName: "C895", Session: "C895Session" },
{ StationName: "KCRWEclectic24", ScraperName: "KCRWEclectic24", Session: "KCRWEclectic24Session" },
{ StationName: "KCQN", ScraperName: "KCQN", Session: "KCQNSession" },
{ StationName: "Gold", ScraperName: "Gold", Session: "GoldSession" },
{ StationName: "WFMU", ScraperName: "WFMU", Session: "WFMUSession" },
{ StationName: "KCRW", ScraperName: "KCRW", Session: "KCRWSession" },
{ StationName: "XFM", ScraperName: "XFM", Session: "XFMSession" },
{ StationName: "PunkFM", ScraperName: "PunkFM", Session: "PunkFMSession" },
{ StationName: "Andys80s", ScraperName: "Andys80s", Session: "Andys80sSession" },
{ StationName: "WFUV", ScraperName: "WFUV", Session: "WFUVSession" },
{ StationName: "FUVAllMusic", ScraperName: "FUVAllMusic", Session: "FUVAllMusicSession" },
{ StationName: "AlternateSide", ScraperName: "AlternateSide", Session: "AlternateSideSession" },
//{ StationName: "DigMusic", ScraperName: "DigMusic", Session: "DigMusicSession" },
{ StationName: "WZBC", ScraperName: "WZBC", Session: "WZBCSession" },
{ StationName: "PlayFM", ScraperName: "PlayFM", Session: "PlayFMSession" },
{ StationName: "ABCJazz", ScraperName: "ABCJazz", Session: "ABCJazzSession" },
{ StationName: "TheCurrent", ScraperName: "TheCurrent", Session: "TheCurrentSession" },
{ StationName: "SomaBagel", ScraperName: "LastFM", ScraperParam: "somabagel", Session: "SomaBagelSession" },
{ StationName: "SomaIllStreet", ScraperName: "LastFM", ScraperParam: "somaillstreet", Session: "SomaIllStreetSession" },
{ StationName: "SomaDroneZone", ScraperName: "LastFM", ScraperParam: "somadronezone", Session: "SomaDroneZoneSession" },
{ StationName: "SomaSpaceStation", ScraperName: "LastFM", ScraperParam: "somaspacestn", Session: "SomaSpaceStationSession" },
{ StationName: "SomaSecretAgent", ScraperName: "LastFM", ScraperParam: "somasecretagent", Session: "SomaSecretAgentSession" },
{ StationName: "SomaGrooveSalad", ScraperName: "LastFM", ScraperParam: "somagroovesalad", Session: "SomaGrooveSaladSession" },
{ StationName: "SomaSonicUniverse", ScraperName: "LastFM", ScraperParam: "somasonicunivrs", Session: "SomaSonicUniverseSession" },
{ StationName: "SomaDigitalis", ScraperName: "LastFM", ScraperParam: "somadigitalis", Session: "SomaDigitalisSession" },
{ StationName: "SomaLush", ScraperName: "LastFM", ScraperParam: "somalush", Session: "SomaLushSession" },
//{ StationName: "BBCRadio1", ScraperName: "LastFMIgnoreListening", ScraperParam: "bbcradio1", Session: "BBCRadio1Session" },
{ StationName: "BBCRadio1", ScraperName: "NewLastFM", ScraperParam: "bbcradio1", Session: "BBCRadio1Session" },
{ StationName: "BBC1Xtra", ScraperName: "LastFMIgnoreListening", ScraperParam: "bbc1xtra", Session: "BBC1XtraSession" },
{ StationName: "BBCRadio2", ScraperName: "LastFMIgnoreListening", ScraperParam: "bbcradio2", Session: "BBCRadio2Session" },
{ StationName: "BBC6", ScraperName: "LastFMIgnoreListening", ScraperParam: "bbc6music", Session: "BBC6Session" },
{ StationName: "SeriousRadio", ScraperName: "LastFMIgnoreListening", ScraperParam: "seriousradio", Session: "SeriousRadioSession" },
//{ StationName: "Absolute80s", ScraperName: "LastFMIgnoreListening", ScraperParam: "absolute80s", Session: "Absolute80sSession" },
//{ StationName: "AbsoluteRadio", ScraperName: "LastFMIgnoreListening", ScraperParam: "absoluteradio", Session: "AbsoluteRadioSession" },
//{ StationName: "Absolute60s", ScraperName: "LastFMIgnoreListening", ScraperParam: "absoluterad60s", Session: "Absolute60sSession" },
//{ StationName: "Absolute70s", ScraperName: "LastFMIgnoreListening", ScraperParam: "absoluterad70s", Session: "Absolute70sSession" },
//{ StationName: "Absolute90s", ScraperName: "LastFMIgnoreListening", ScraperParam: "absoluterad90s", Session: "Absolute90sSession" },
//{ StationName: "Absolute00s", ScraperName: "LastFMIgnoreListening", ScraperParam: "absoluterad00s", Session: "Absolute00sSession" },
//{ StationName: "AbsoluteClassic", ScraperName: "LastFMIgnoreListening", ScraperParam: "absoluteclassic", Session: "AbsoluteClassicSession" },
{ StationName: "MutantRadio", ScraperName: "LastFM", ScraperParam: "mutant_radio", Session: "MutantRadioSession" },
{ StationName: "StuBruRadio", ScraperName: "LastFMIgnoreListening", ScraperParam: "stubruradio", Session: "StuBruRadioSession" },
{ StationName: "Infinita", ScraperName: "Infinita", Session: "InfinitaSession" },
{ StationName: "Oasis", ScraperName: "Oasis", Session: "OasisSession" },
{ StationName: "Horizonte", ScraperName: "Horizonte", Session: "HorizonteSession" },
{ StationName: "NewtownRadio", ScraperName: "NewtownRadio", Session: "NewtownRadioSession" },
{ StationName: "Radio2NL", ScraperName: "Radio2NL", Session: "Radio2NLSession" },
{ StationName: "Air1", ScraperName: "Air1", Session: "Air1Session" },
{ StationName: "KLove", ScraperName: "KLove", Session: "KLoveSession" },
{ StationName: "doublejradio", ScraperName: "DoubleJ", Session: "DoubleJSession" },
{ StationName: "RadioGente", ScraperName: "RadioGente", Session: "RadioGenteSession" },
{ StationName: "MoleculaCL", ScraperName: "Molecula", Session: "MoleculaSession" },
{ StationName: "AmazingRadio", ScraperName: "Amazing", Session: "AmazingRadioSession" },
{ StationName: "WFMUDrummer", ScraperName: "WFMUDrummer", Session: "WFMUDrummerSession" },
{ StationName: "WFMUIchiban", ScraperName: "WFMUIchiban", Session: "WFMUIchibanSession" },
{ StationName: "WFMUUbu", ScraperName: "WFMUUbu", Session: "WFMUUbuSession" },
{ StationName: "doublejradio", ScraperName: "DoubleJ", Session: "DoubleJSession" },
{ StationName: "sonarfm", ScraperName: "Sonar", Session: "SonarSession" },
{ StationName: "RockFMUK", ScraperName: "RockFM", Session: "RockFMSession" },
{ StationName: "FluxFMRadio", ScraperName: "FluxFM", Session: "FluxFMSession" },
{ StationName: "CBCRadio2", ScraperName: "CBCRadio2", Session: "CBCRadio2Session" },
{ StationName: "CBCRadio3", ScraperName: "CBCRadio3", Session: "CBCRadio3Session" },
{ StationName: "WFKUGoth", ScraperName: "WFKUGoth", Session: "WFKUGothSession" },
{ StationName: "WFKUPerki", ScraperName: "WFKUPerki", Session: "WFKUPerkiSession" },
{ StationName: "DawgFM", ScraperName: "DawgFM", Session: "DawgFMSession" },
{ StationName: "DrDkP3", ScraperName: "DrDk", Session: "DrDkP3Session", ScraperParam: "p3" },
{ StationName: "DrDkP4", ScraperName: "DrDk", Session: "DrDkP4Session", ScraperParam: "p4kbh" },
{ StationName: "DrDkP7", ScraperName: "DrDk", Session: "DrDkP7Session", ScraperParam: "p7mix" },
{ StationName: "CoreOfDestruction", ScraperName: "CoreOfDestruction", Session: "CoreOfDestructionSession" },
{ StationName: "Bristol", ScraperName: "Bristol", Session: "BristolSession" },
{ StationName: "Fip", ScraperName: "Fip", Session: "FipSession" },
{ StationName: "Chronisch", ScraperName: "Chronisch", Session: "ChronischSession" },
{ StationName: "ByteFM", ScraperName: "ByteFM", Session: "ByteFMSession" },
{ StationName: "RadyoBabylon", ScraperName: "RadyoBabylon", Session: "RadyoBabylonSession" }
];
var usersListening:{[index: string]:usr.User[]} = {
KEXP903FM: [{ UserName: "KEXPListener1", Session: "KEXPListener1Session" },
{ UserName: "KEXPListener2", Session: "KEXPListener2Session" }],
NNM: [{ UserName: "KEXPListener1", Session: "KEXPListener1Session" }],
triplejradio: [{ UserName: "JJJListener1", Session: "JJJListener1Session" }, null],
BBCRadio1: [{ UserName: "BBCListener1", Session: "BBCListener1Session" }],
TheEnd: null,
TheCurrent: []
};
var lastFmDao = new lfmDao.DummyLastFmDao();
var userDao = new usrDao.DummyUserDao();
var scrobbler = new scrob.Scrobbler(lastFmDao, userDao);
setInterval(() => { testScrapeAndScrobble(); }, interval);
testScrapeAndScrobble();
function testScrapeAndScrobble() {
_.each(stations, (station:stat.Station) => {
if (station) {
scrobbler.scrapeAndScrobble(scrapers[station.ScraperName], station, usersListening[station.StationName]);
}
});
};
*/
//# sourceMappingURL=main.js.map
