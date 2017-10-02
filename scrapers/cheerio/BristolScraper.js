"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
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
var scrap = require("./CheerioScraper");
var BristolScraper = (function (_super) {
    __extends(BristolScraper, _super);
    function BristolScraper(name) {
        return _super.call(this, name) || this;
    }
    BristolScraper.prototype.getUrl = function () {
        return "http://api.radionomy.com/currentsong.cfm?radiouid=f9d055a4-0ce8-4f45-a401-28aed720b2d2&type=xml&cachbuster=" +
            new Date().getTime();
    };
    BristolScraper.prototype.parseCheerio = function ($, callback) {
        var title = $('title').first().text().trim();
        var artist = $('artists').first().text().trim();
        if (title && artist) {
            callback(null, { Artist: artist, Track: title });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return BristolScraper;
}(scrap.CheerioScraper));
exports.BristolScraper = BristolScraper;
//# sourceMappingURL=BristolScraper.js.map