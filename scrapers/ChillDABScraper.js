/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./Scraper");
var ChillDABScraper = (function (_super) {
    __extends(ChillDABScraper, _super);
    function ChillDABScraper(name) {
        _super.call(this, name);
        this.url = "http://www.ebulabs.org/tools/radiovis-ajaxplayer/radiovis-webplayer/comet.php?last_id=ID%3Alqctwebnode1-41914-1420627692907-2%3A2961232%3A-1%3A1%3A453543399&topic=%2Ftopic%2Fdab%2Fce1%2Fc199%2Fc1c3%2F0%2Ftext&visserver=vis.musicradio.com&visport=61613";
    }
    ChillDABScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseBody(body, callback);
        });
    };
    ChillDABScraper.prototype.parseBody = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var infoPattern = /^TEXT Now on Chill: (.*?) with (.*?)$/m;
        var infoMatches = infoPattern.exec(body);
        if (infoMatches && infoMatches.length > 2) {
            callback(null, {
                Artist: this.capitalize(infoMatches[1].trim()),
                Track: this.capitalize(infoMatches[2].trim())
            });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return ChillDABScraper;
})(scrap.Scraper);
exports.ChillDABScraper = ChillDABScraper;
//# sourceMappingURL=ChillDABScraper.js.map