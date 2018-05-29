(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function debugLog(...args) {
        if (process.env.DEBUG !== undefined) {
            console.log(...args);
        }
    }
    exports.debugLog = debugLog;
});
//# sourceMappingURL=debugging.js.map