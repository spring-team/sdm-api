"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractFingerprint_1 = require("./AbstractFingerprint");
/**
 * Typed fingerprint. Takes care of serializing the passed in data structure.
 */
class TypedFingerprint extends AbstractFingerprint_1.AbstractFingerprint {
    constructor(name, abbreviation, version, t) {
        super(name, abbreviation, version);
        this.t = t;
    }
    get data() {
        return JSON.stringify(this.t);
    }
    /**
     * Return the fingerprint as a JSON object
     * @return {T}
     */
    get object() {
        return JSON.parse(this.data);
    }
}
exports.TypedFingerprint = TypedFingerprint;
//# sourceMappingURL=TypedFingerprint.js.map