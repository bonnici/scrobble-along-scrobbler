"use strict";
/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
/// <reference path="../../definitions/DefinitelyTyped/underscore/underscore.d.ts"/>
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
var scrap = require("./JsonScraper");
var moment = require("moment-timezone");
var CbcRadioScraper = (function (_super) {
    __extends(CbcRadioScraper, _super);
    function CbcRadioScraper(name) {
        return _super.call(this, name) || this;
    }
    CbcRadioScraper.prototype.getUrl = function (stationId) {
        var now = moment().tz("America/Toronto");
        return "http://www.cbcmusic.ca/Component/Playlog/GetPlaylog?stationId=" + stationId + "&date=" + now.format("YYYY-MM-DD") + "&_=" + new Date().getTime();
    };
    CbcRadioScraper.prototype.extractNowPlayingSong = function (jsonData) {
        var programs = jsonData.programs;
        var lastProgram = programs[programs.length - 1];
        var tracks = lastProgram.Tracks;
        var lastTrack = tracks[tracks.length - 1];
        return { Artist: lastTrack.Artists[0], Track: lastTrack.Title };
    };
    return CbcRadioScraper;
}(scrap.JsonScraper));
exports.CbcRadioScraper = CbcRadioScraper;
//# sourceMappingURL=CbcRadioScraper.js.map