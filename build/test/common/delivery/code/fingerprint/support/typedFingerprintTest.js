"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const TypedFingerprint_1 = require("../../../../../../src/common/delivery/code/fingerprint/support/TypedFingerprint");
const sha_1 = require("../../../../../../src/util/misc/sha");
describe("TypedFingerprint", () => {
    it("should convert valid data", () => {
        const fp = new TypedFingerprint_1.TypedFingerprint("name", "ABR", "0.1.0", {
            name: "tony",
            age: 65,
        });
        assert.equal(fp.object.name, "tony");
        assert.equal(fp.object.age, 65);
        assert.equal(JSON.parse(fp.data).name, "tony");
        assert.equal(JSON.parse(fp.data).age, 65);
    });
    it("should compute sha", () => {
        const fp = new TypedFingerprint_1.TypedFingerprint("name", "ABR", "0.1.0", {
            name: "tony",
            age: 65,
        });
        assert(!!fp.sha);
        assert(sha_1.isValidSHA1(fp.sha));
    });
});
//# sourceMappingURL=typedFingerprintTest.js.map