/// <reference path="../../definitions/typescript-node-definitions/winston.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonScrap = require("./JsonScraper");
var RadioRielScraper = (function (_super) {
    __extends(RadioRielScraper, _super);
    function RadioRielScraper(name) {
        _super.call(this, name);
    }
    RadioRielScraper.prototype.getUrl = function (username) {
        if (!username) {
            throw "username is required";
        }
        return "http://music.slserver.com:2199/external/rpc.php?m=streaminfo.get&username=" + username +
            "&charset=&mountpoint=&rid=" + username + "&_=" + new Date().getTime();
    };
    RadioRielScraper.prototype.extractNowPlayingSong = function (jsonData) {
        return { Artist: jsonData.data[0].track.artist, Track: jsonData.data[0].track.title };
    };
    return RadioRielScraper;
})(jsonScrap.JsonScraper);
exports.RadioRielScraper = RadioRielScraper;
//# sourceMappingURL=RadioRielScraper.js.map