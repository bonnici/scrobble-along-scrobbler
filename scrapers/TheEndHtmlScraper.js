/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var winston = require("winston");

var TheEndHtmlScraper = (function (_super) {
    __extends(TheEndHtmlScraper, _super);
    function TheEndHtmlScraper(name) {
        _super.call(this, name);
    }
    TheEndHtmlScraper.prototype.getUrl = function () {
        return "http://kndd.tunegenie.com/?framed=1";
    };

    TheEndHtmlScraper.prototype.parseCheerio = function ($, callback) {
        var songElements = $('ul.currentonair li');

        if (songElements.length < 1) {
            winston.warn("TheEndHtmlScraper: songElements is not big enough");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var songDiv = songElements.eq(0).find('div.song');

        if (!songDiv || songDiv.length < 1) {
            winston.warn("TheEndHtmlScraper: couldn't find song");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artistDiv = songElements.eq(0).find('div.song').eq(0).next('div');
        if (!artistDiv || artistDiv.length < 1) {
            winston.warn("TheEndHtmlScraper: couldn't find artist");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var songText = songDiv.eq(0).text();
        var artistText = artistDiv.eq(0).text();

        if (!songText || !songText.trim() || !artistText || !artistText.trim()) {
            winston.warn("TheEndHtmlScraper: empty song or artist");
            callback(null, { Artist: null, Track: null });
            return;
        }

        callback(null, { Artist: artistText.trim(), Track: songText.trim() });
    };
    return TheEndHtmlScraper;
})(scrap.CheerioScraper);
exports.TheEndHtmlScraper = TheEndHtmlScraper;

//# sourceMappingURL=TheEndHtmlScraper.js.map
