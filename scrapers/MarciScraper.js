"use strict";
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
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
var MarciScraper = (function (_super) {
    __extends(MarciScraper, _super);
    function MarciScraper(name, marciNumber) {
        var _this = _super.call(this, name) || this;
        _this.url = "http://marci" + marciNumber + ".getmarci.com/ajaxRequester.php?_=" + new Date().getTime() + "&s=marci" + marciNumber;
        return _this;
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
                return;
            }
            callback(null, {
                Artist: null,
                Track: null
            });
        });
    };
    return MarciScraper;
}(scrap.Scraper));
exports.MarciScraper = MarciScraper;
//# sourceMappingURL=MarciScraper.js.map