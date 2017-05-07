/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/dummy-definitions/moment-timezone.d.ts"/>
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
var scrap = require("./CheerioScraper");
var BellyUp4BluesScraper = (function (_super) {
    __extends(BellyUp4BluesScraper, _super);
    function BellyUp4BluesScraper(name) {
        return _super.call(this, name) || this;
    }
    BellyUp4BluesScraper.prototype.getUrl = function () {
        return "http://apps.streamlicensing.com/covers_widget.cgi?sid=3382&output=1";
    };
    BellyUp4BluesScraper.prototype.parseCheerio = function ($, callback) {
        var artistElem = $('span#artist0');
        var titleElem = $('span#title0');
        var artist = artistElem.text();
        var title = titleElem.text();
        if (artist.trim() && title.trim()) {
            callback(null, { Artist: artist.trim(), Track: title.trim() });
        }
        else {
            callback(null, { Artist: null, Track: null });
        }
    };
    return BellyUp4BluesScraper;
}(scrap.CheerioScraper));
exports.BellyUp4BluesScraper = BellyUp4BluesScraper;
//# sourceMappingURL=BellyUp4BluesScraper.js.map