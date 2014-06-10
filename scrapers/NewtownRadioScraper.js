/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./Scraper");


var winston = require("winston");

var NewtownRadioScraper = (function (_super) {
    __extends(NewtownRadioScraper, _super);
    function NewtownRadioScraper(name) {
        _super.call(this, name);
        this.url = "http://www.live365.com/pls/front?handler=playlist&cmd=view&viewType=xml&handle=fireproofradio&maxEntries=3&tm=";
    }
    NewtownRadioScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        var fullUrl = this.url + new Date().getTime();
        this.fetchUrl(fullUrl, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseHtml(body, callback);
        });
    };

    NewtownRadioScraper.prototype.parseHtml = function (body, callback) {
        if (!body) {
            winston.warn("NewtownRadioScraper: No HTML body");
            callback(null, { Artist: null, Track: null });
            return;
        }

        // Cheerio not working, use regex
        var artistPattern = /<Artist>(.*?)<\/Artist>/;
        var artistMatches = artistPattern.exec(body);
        var titlePattern = /<Title>(.*?)<\/Title>/;
        var titleMatches = titlePattern.exec(body);

        if (artistMatches && artistMatches.length > 1 && titleMatches && titleMatches.length > 1) {
            callback(null, {
                Artist: artistMatches[1].trim(),
                Track: titleMatches[1].trim()
            });
        } else {
            callback(null, {
                Artist: null,
                Track: null
            });
        }
    };
    return NewtownRadioScraper;
})(scrap.Scraper);
exports.NewtownRadioScraper = NewtownRadioScraper;

//# sourceMappingURL=NewtownRadioScraper.js.map
