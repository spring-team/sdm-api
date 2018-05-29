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
    function objectMapToArray(objectMap) {
        return Object.keys(objectMap).map(key => ({ key, value: objectMap[key] }));
    }
    exports.objectMapToArray = objectMapToArray;
});
//# sourceMappingURL=object-map-to-array.js.map