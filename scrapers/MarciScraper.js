/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./Scraper");
var MarciScraper = (function (_super) {
    __extends(MarciScraper, _super);
    function MarciScraper(name, marciNumber) {
        _super.call(this, name);
        this.url = "http://marci" + marciNumber + ".getmarci.com/ajaxRequester.php?_=" + new Date().getTime() + "&s=marci" + marciNumber;
    }
    MarciScraper.prototype.fetchAndParse = function (callback) {
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            var split = body.split("-");
            if (split.length > 1) {
                callback(null, {
                    Artist: split[0].trim(),
                    Track: split[1].trim()
                });
            }
            callback(null, {
                Artist: null,
                Track: null
            });
        });
    };
    return MarciScraper;
})(scrap.Scraper);
exports.MarciScraper = MarciScraper;
//# sourceMappingURL=MarciScraper.js.map