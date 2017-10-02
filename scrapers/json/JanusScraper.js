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
var scrap = require("./JsonScraper");
var JanusScraper = (function (_super) {
    __extends(JanusScraper, _super);
    function JanusScraper(name, urlName) {
        var _this = _super.call(this, name) || this;
        _this.baseUrl = "http://" + urlName + "-int.janus.cl/app_janus/site/canciones/last.json?_=";
        return _this;
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