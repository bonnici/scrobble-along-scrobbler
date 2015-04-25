/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./Scraper");
var BellyUp4BluesScraper = (function (_super) {
    __extends(BellyUp4BluesScraper, _super);
    function BellyUp4BluesScraper(name) {
        _super.call(this, name);
    }
    BellyUp4BluesScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        var url = "http://directory.pronetlicensing.com/getsong.cgi?sid=3545&rn=" + Math.floor(Math.random() * 100000);
        this.fetchUrl(url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseBody(body, callback);
        });
    };
    BellyUp4BluesScraper.prototype.parseBody = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var parts = body.split(" - ");
        if (parts.length >= 2) {
            callback(null, { Artist: parts[0], Track: parts[1] });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return BellyUp4BluesScraper;
})(scrap.Scraper);
exports.BellyUp4BluesScraper = BellyUp4BluesScraper;
//# sourceMappingURL=BellyUp4BluesScraper.js.map