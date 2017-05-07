/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var scrap = require("./Scraper");
var RadionomyScraper = (function (_super) {
    __extends(RadionomyScraper, _super);
    function RadionomyScraper(name, radioId) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://api.radionomy.com/currentsong.cfm?radiouid=" + radioId + "&type=json";
        return _this;
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
}(scrap.Scraper));
exports.RadionomyScraper = RadionomyScraper;
//# sourceMappingURL=RadionomyScraper.js.map