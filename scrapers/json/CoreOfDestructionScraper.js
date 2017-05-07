/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
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
var jsonScrap = require("./JsonScraper");
var winston = require("winston");
var CoreOfDestructionScraper = (function (_super) {
    __extends(CoreOfDestructionScraper, _super);
    function CoreOfDestructionScraper(name) {
        return _super.call(this, name) || this;
    }
    CoreOfDestructionScraper.prototype.getUrl = function (scraperParam) {
        return "http://apps.streamlicensing.com/snippet.cgi?sid=2208&rand_" + this.generateRandomNumber() + "="
            + this.generateRandomNumber();
    };
    CoreOfDestructionScraper.prototype.generateRandomNumber = function () {
        var result = "";
        for (var i = 0; i < 5; i++) {
            result += Math.ceil(Math.random() * 10);
        }
        return result;
    };
    CoreOfDestructionScraper.prototype.preprocessBody = function (body) {
        //simple regex to extract json body
        var matches = body.match(/{.*}/);
        return matches.length > 0 ? matches[0] : body;
    };
    CoreOfDestructionScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var track = jsonData.song;
        var splitDetails = track.split(" - ");
        if (splitDetails.length < 2) {
            winston.error("CoreOfDestructionScraper found invalid track details ", splitDetails);
            return { Artist: null, Track: null };
        }
        else {
            return {
                Artist: splitDetails[0].trim(),
                Track: splitDetails[1].trim()
            };
        }
    };
    return CoreOfDestructionScraper;
}(jsonScrap.JsonScraper));
exports.CoreOfDestructionScraper = CoreOfDestructionScraper;
//# sourceMappingURL=CoreOfDestructionScraper.js.map