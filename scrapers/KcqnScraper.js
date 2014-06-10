/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");


var winston = require("winston");

var KcqnScraper = (function (_super) {
    __extends(KcqnScraper, _super);
    function KcqnScraper(name) {
        _super.call(this, name);
    }
    KcqnScraper.prototype.getUrl = function () {
        return "http://www.kcqnutah.com/tmp/testFile.txt?" + new Date().getTime();
    };

    KcqnScraper.prototype.parseCheerio = function ($, callback) {
        /*
        e.g.
        <p class="textnormal"> 11:19 am</p><p class="songtitle"> Misfit <span class="songartist"> Curiousity Killed The Cat </span></p><span class="pasthoursongs"><a href="http://www.kcqnutah.com/?action=past_hour">[ See the last hour of songs ]</a></span>
        */
        var songtitleParagraph = $('p.songtitle');
        var artistSpan = $('p.songtitle span.songartist');

        if (songtitleParagraph.length < 1 || artistSpan.length < 1) {
            winston.warn("KcqnScraper: No songtitle paragraph or artist span", { songtitleParagraphLength: songtitleParagraph.length, artistSpanLength: artistSpan.length });
            callback(null, { Artist: null, Track: null });
            return;
        }

        var artistText = artistSpan.eq(0).text();
        var titleText = songtitleParagraph.eq(0).text();

        if (!artistText.trim() || !titleText.trim()) {
            winston.warn("KcqnScraper: Blank artist or title", { artistText: artistText, titleText: titleText });
            callback(null, { Artist: null, Track: null });
            return;
        }

        // title includes artist, so substring it out
        titleText = titleText.substring(0, titleText.length - artistText.length);

        artistText = artistText.trim();
        titleText = titleText.trim();

        if (artistText && titleText) {
            winston.info("KcqnScraper found song " + artistText + " - " + titleText);
            callback(null, { Artist: artistText, Track: titleText });
        } else {
            winston.info("KcqnScraper could not find song");
            callback(null, { Artist: null, Track: null });
        }
    };
    return KcqnScraper;
})(scrap.CheerioScraper);
exports.KcqnScraper = KcqnScraper;

//# sourceMappingURL=KcqnScraper.js.map
