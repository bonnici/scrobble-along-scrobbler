/// <reference path="../../definitions/DefinitelyTyped/node/node.d.ts"/>
var crypto = require("crypto");

var DummyCrypter = (function () {
    function DummyCrypter() {
    }
    DummyCrypter.prototype.encrypt = function (text) {
        return text;
    };

    DummyCrypter.prototype.decrypt = function (text) {
        return text;
    };
    return DummyCrypter;
})();
exports.DummyCrypter = DummyCrypter;

var CrypterImpl = (function () {
    function CrypterImpl(key) {
        this.key = key;
    }
    CrypterImpl.prototype.encrypt = function (text) {
        var cipher = crypto.createCipher('aes192', this.key);
        var result = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        return result;
    };

    CrypterImpl.prototype.decrypt = function (text) {
        var decipher = crypto.createDecipher('aes192', this.key);
        var result = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
        return result;
    };
    return CrypterImpl;
})();
exports.CrypterImpl = CrypterImpl;

//# sourceMappingURL=Crypter.js.map
