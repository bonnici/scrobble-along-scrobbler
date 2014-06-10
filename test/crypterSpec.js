/// <reference path="../../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>
var c = require("../common/Crypter");

describe("CrypterImpl", function () {
    describe("encrypt & decrypt", function () {
        it('should produce a string that is different but reversable', function () {
            var crypter = new c.CrypterImpl("random string");
            var toEncrypt = "string to encrypt";
            var encrypted = crypter.encrypt(toEncrypt);
            var decrypted = crypter.decrypt(encrypted);

            expect(toEncrypt).toEqual(decrypted);
            expect(encrypted).not.toEqual(toEncrypt);
        });
    });
});

//# sourceMappingURL=crypterSpec.js.map
