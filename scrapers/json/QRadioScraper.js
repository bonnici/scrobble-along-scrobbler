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
var QRadioScraper = (function (_super) {
    __extends(QRadioScraper, _super);
    function QRadioScraper(name) {
        return _super.call(this, name) || this;
    }
    QRadioScraper.prototype.getUrl = function () {
        return "http://np.radioplayer.co.uk/qp/v3/events?rpId=1350&descriptionSize=200&_="
            + new Date().getTime();
    };
    QRadioScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.results.now.artistName, Track: jsonData.results.now.name };
    };
    return QRadioScraper;
}(scrap.JsonScraper));
exports.QRadioScraper = QRadioScraper;
//# sourceMappingURL=QRadioScraper.js.map