/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var winston = require("winston");

var Andys80sScraper = (function (_super) {
    __extends(Andys80sScraper, _super);
    function Andys80sScraper(name) {
        _super.call(this, name);
    }
    Andys80sScraper.prototype.getUrl = function () {
        return "http://www.andys80s.com/playing.html";
    };

    Andys80sScraper.prototype.parseCheerio = function ($, callback) {
        // html is malformed, just get all TRs, find the one with a TD that says "Currently Playing", and use the next row
        var target = -1;
        var songText = '';
        $('tr').each(function (i, elem) {
            var tds = $(this).children('td');
            if (i == target) {
                if (tds.length >= 1) {
                    songText = tds.eq(0).text().trim();
                }
                return;
            }

            if (tds.length >= 1) {
                if (tds.eq(0).text().trim().toLowerCase() == 'currently playing') {
                    target = i + 1;
                }
            }
        });

        songText = songText.trim();
        if (!songText) {
            winston.info("Andys80sScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }

        // This will probably break for some artists
        var separator = songText.indexOf(" - ");
        if (separator < 0) {
            winston.info("Andys80sScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artistText = songText.substring(0, separator).trim();
        var songText = songText.substring(separator + 3).trim();

        if (!artistText || !songText) {
            winston.info("Andys80sScraper could not find song");
            callback(null, { Artist: null, Track: null });
            return;
        } else {
            winston.info("Andys80sScraper found song " + artistText + " - " + songText);
            callback(null, { Artist: artistText, Track: songText });
            return;
        }
    };
    return Andys80sScraper;
})(scrap.CheerioScraper);
exports.Andys80sScraper = Andys80sScraper;

//# sourceMappingURL=Andys80sScraper.js.map
