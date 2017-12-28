"use strict";
/// <reference path="../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
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
var htmlentities = require("html-entities");
var BellyUp4BluesScraper = (function (_super) {
    __extends(BellyUp4BluesScraper, _super);
    function BellyUp4BluesScraper(name) {
        var _this = _super.call(this, name) || this;
        _this.entities = new htmlentities.XmlEntities();
        return _this;
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
        if (parts.length >= 2 && parts[0] && parts[1]) {
            callback(null, { Artist: this.entities.decode(parts[0].trim()), Track: this.entities.decode(parts[1].trim()) });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return BellyUp4BluesScraper;
}(scrap.Scraper));
exports.BellyUp4BluesScraper = BellyUp4BluesScraper;
//# sourceMappingURL=BellyUp4BluesScraper.js.map