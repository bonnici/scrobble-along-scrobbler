/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scrap = require("./JsonScraper");
var JanusScraper = (function (_super) {
    __extends(JanusScraper, _super);
    function JanusScraper(name, urlName) {
        _super.call(this, name);
        this.baseUrl = "http://" + urlName + "-int.janus.cl/app_janus/site/canciones/last.json?_=";
    }
    JanusScraper.prototype.getUrl = function (lastfmUsername) {
        return this.baseUrl + new Date().getTime();
    };
    JanusScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: this.capitalize(jsonData[0].artistName), Track: this.capitalize(jsonData[0].titleName) };
    };
    return JanusScraper;
}(scrap.JsonScraper));
exports.JanusScraper = JanusScraper;
//# sourceMappingURL=JanusScraper.js.map