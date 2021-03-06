/// <reference path="../definitions/DefinitelyTyped/jasmine/jasmine.d.ts"/>

import c = require("../common/Crypter");

describe("CrypterImpl", () => {
	describe("encrypt & decrypt", () => {
		it('should produce a string that is different but reversable', () => {
			var crypter = new c.CrypterImpl("random string");
			var toEncrypt = "string to encrypt";
			var encrypted = crypter.encrypt(toEncrypt);
			var decrypted = crypter.decrypt(encrypted);

			expect(toEncrypt).toEqual(decrypted);
			expect(encrypted).not.toEqual(toEncrypt);
		});
	});
});