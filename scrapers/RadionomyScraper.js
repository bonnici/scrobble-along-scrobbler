/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./Scraper");
var RadionomyScraper = (function (_super) {
    __extends(RadionomyScraper, _super);
    function RadionomyScraper(name, radioId) {
        _super.call(this, name);
        this.url = "http://api.radionomy.com/currentsong.cfm?radiouid=" + radioId + "&type=json";
    }
    RadionomyScraper.prototype.fetchAndParse = function (callback) {
        var _this = this;
        this.fetchUrl(this.url, function (err, body) {
            if (err) {
                callback(err, null);
                return;
            }
            _this.parseBody(body, callback);
        });
    };
    RadionomyScraper.prototype.parseBody = function (body, callback) {
        if (!body) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        // Cheerio & json not working, use regex
        var artistPattern = / artists:'(.*?)'/;
        var artistMatches = artistPattern.exec(body);
        var titlePattern = / title:'(.*?)'/;
        var titleMatches = titlePattern.exec(body);
        if (artistMatches && artistMatches.length > 1 && titleMatches && titleMatches.length > 1) {
            callback(null, {
                Artist: artistMatches[1].trim(),
                Track: titleMatches[1].trim()
            });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return RadionomyScraper;
})(scrap.Scraper);
exports.RadionomyScraper = RadionomyScraper;
//# sourceMappingURL=RadionomyScraper.js.map