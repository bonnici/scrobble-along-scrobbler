/// <reference path="../../definitions/DefinitelyTyped/node/node.d.ts"/>

import crypto = require("crypto");

export interface Crypter {
	encrypt(text: string): string;
	decrypt(text: string): string;
}

export class DummyCrypter implements Crypter {
	public encrypt(text: string): string {
		return text;
	}

	public decrypt(text: string): string {
		return text;
	}
}

export class CrypterImpl implements Crypter {
	constructor(private key:string) {}

	public encrypt(text: string): string {
		var cipher = crypto.createCipher('aes192', this.key);
		var result = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
		return result;
	}

	public decrypt(text: string): string {
		var decipher = crypto.createDecipher('aes192', this.key);
		var result = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
		return result;
	}
}