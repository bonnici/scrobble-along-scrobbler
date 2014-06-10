/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var scrap = require("./CheerioScraper");




var WfmuScraper = (function (_super) {
    __extends(WfmuScraper, _super);
    function WfmuScraper(name, channel) {
        _super.call(this, name);
        this.channel = channel || "1";
        this.baseUrl = "http://www.wfmu.org/currentliveshows.php?xml=1&c=";
    }
    WfmuScraper.prototype.getUrl = function () {
        return this.baseUrl + this.channel + "&_=" + new Date().getTime();
    };

    WfmuScraper.prototype.parseCheerio = function ($, callback) {
        var songElem = $('live title');
        var artistElem = $('live artist');

        if (songElem.length > 0) {
            var songText = songElem.eq(0).text().trim();
        }
        if (artistElem.length > 0) {
            var artistText = artistElem.eq(0).text().trim();
        }

        if (songText && !artistText) {
            // Special case - song and artist inside song elem
            var dashIndex = songText.indexOf(" - ");
            artistText = songText.substr(0, dashIndex);
            songText = songText.substr(dashIndex + 3);
        }

        if (songText && artistText) {
            callback(null, { Artist: artistText, Track: songText });
        } else {
            callback(null, { Artist: null, Track: null });
        }
        /*
        Example (cutdown):
        
        <div id="nowplaysong">
        <div id="nowplaying">
        <div class="bigline">
        <span class="KDBFavIcon KDBsong" id="KDBsong-1354099">
        <a href="http://www.wfmu.org/auth.php?a=fav_icon_clicked&amp;type=song&amp;id=1354099&amp;page_type=homepage&amp;page_id=1&amp;r=http%3A%2F%2Fwww.wfmu.org%2F"
        onclick="KDBFav.fav_icon_clicked(event, this.parentNode);"
        title="Click for options"
        ><img src="/Gfx/star_empty_2.png" border="0" alt="Options" /></a>
        </span>
        &quot;Down &amp; To The Left&quot;
        by
        Amon Tobin
        </div>
        </div>
        </div>
        */
        /*
        var songDiv = $('div#nowplaysong div#nowplaying div.bigline');
        
        if (songDiv.length < 1) {
        winston.warn("WfmuScraper: No song div", { songDivLength: songDiv.length });
        callback(null, { Artist: null, Track: null });
        return;
        }
        
        var songText = songDiv.eq(0).text();
        
        if (!songText.trim()) {
        winston.warn("WfmuScraper: Blank text", { songText: songText });
        callback(null, { Artist: null, Track: null });
        return;
        }
        
        songText = songText.trim();
        
        // Text should be of the form "title" by artist
        var firstQuote = songText.indexOf('"');
        var lastQuote = songText.lastIndexOf('"');
        
        if (firstQuote != 0 || lastQuote <= 0 || songText.length <= lastQuote + 4) {
        winston.warn("WfmuScraper: Invalid text", { songText: songText });
        callback(null, { Artist: null, Track: null });
        return;
        }
        
        var byText = songText.substring(lastQuote + 1, lastQuote + 5);
        if (byText != "\nby\n") {
        winston.warn("WfmuScraper: Invalid text [" + byText + "]");
        callback(null, { Artist: null, Track: null });
        return;
        }
        
        var titleText = songText.substring(1, lastQuote).trim();
        var artistText = songText.substring(lastQuote + 4).trim();
        
        if (artistText && titleText) {
        winston.info("WfmuScraper found song " + artistText + " - " + titleText);
        callback(null, { Artist: artistText, Track: titleText });
        }
        else {
        winston.info("WfmuScraper could not find song");
        callback(null, { Artist: null, Track: null });
        }
        */
    };
    return WfmuScraper;
})(scrap.CheerioScraper);
exports.WfmuScraper = WfmuScraper;

//# sourceMappingURL=WfmuScraper.js.map
