/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var winston = require("winston");
var MegaStarFmScraper = (function (_super) {
    __extends(MegaStarFmScraper, _super);
    function MegaStarFmScraper(name) {
        _super.call(this, name);
    }
    MegaStarFmScraper.prototype.getUrl = function (scraperParam) {
        return "http://bo.cope.webtv.flumotion.com/api/active?format=json&podId=75";
    };
    MegaStarFmScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var details = jsonData.value;
        try {
            var parsedDetails = JSON.parse(details);
        }
        catch (e) {
            winston.error("MegaStarFmScraper could not parse details", parsedDetails);
            return {
                Artist: null,
                Track: null
            };
        }
        return {
            Artist: parsedDetails.author,
            Track: parsedDetails.title
        };
    };
    return MegaStarFmScraper;
}(jsonScrap.JsonScraper));
exports.MegaStarFmScraper = MegaStarFmScraper;
//# sourceMappingURL=MegaStarFmScraper.js.map