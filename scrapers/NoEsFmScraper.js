/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./Scraper");
var NoEsFmScraper = (function (_super) {
    __extends(NoEsFmScraper, _super);
    function NoEsFmScraper(name) {
        _super.call(this, name);
    }
    NoEsFmScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        var url = "http://marci1319.getmarci.com/ajaxRequester.php?_=" + new Date().getTime() + "&s=marci1319";
        this.fetchUrl(url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseBody(body, callback);
        });
    };
    NoEsFmScraper.prototype.parseBody = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artistEnd = body.indexOf(" - ");
        if (artistEnd < 0) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var artist = body.substring(0, artistEnd);
        var track = body.substring(artistEnd + 3);
        var twitterStart = track.indexOf("@");
        if (twitterStart > 0) {
            track = track.substr(0, twitterStart - 1);
        }
        if (artist && track) {
            callback(null, { Artist: artist, Track: track });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return NoEsFmScraper;
})(scrap.Scraper);
exports.NoEsFmScraper = NoEsFmScraper;
//# sourceMappingURL=NoEsFmScraper.js.map