"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
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
var KrautrockWorldScraper = (function (_super) {
    __extends(KrautrockWorldScraper, _super);
    function KrautrockWorldScraper(name) {
        return _super.call(this, name) || this;
    }
    KrautrockWorldScraper.prototype.getUrl = function () {
        return "http://radio.krautrock-world.com/playing.php";
    };
    KrautrockWorldScraper.prototype.parseCheerio = function ($, callback) {
        // This HTML is really badly malformed
        var tables = $("table");
        if (!tables || tables.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var subTables = tables.eq(1).find("table");
        if (!subTables || subTables.length < 3) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var rows = subTables.eq(4).find("tr");
        if (!rows || rows.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var tds = rows.eq(1).find("td");
        if (!tds || tds.length < 1) {
            callback(null, { Artist: null, Track: null });
            return;
        }
        var split = tds.eq(1).text().trim().split(" - ");
        if (split && split.length > 1) {
            callback(null, { Artist: split[0], Track: split[1] });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return KrautrockWorldScraper;
}(scrap.CheerioScraper));
exports.KrautrockWorldScraper = KrautrockWorldScraper;
//# sourceMappingURL=KrautrockWorld.js.map