"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sha_1 = require("../../../../../util/misc/sha");
/**
 * Convenient superclass for fingerprints.
 */
class AbstractFingerprint {
    constructor(name, abbreviation, version) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.version = version;
    }
    get sha() {
        return sha_1.computeShaOf(this.data);
    }
}
exports.AbstractFingerprint = AbstractFingerprint;
//# sourceMappingURL=AbstractFingerprint.js.map