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
    function isFieldNode(node) {
        return node['name'] !== undefined && node['selectionSet'] !== undefined && node['type'] !== undefined;
    }
    exports.isFieldNode = isFieldNode;
    function isFragmentSpreadNode(node) {
        return node['fragmentName'] !== undefined;
    }
    exports.isFragmentSpreadNode = isFragmentSpreadNode;
    function isInlineFragmentNode(node) {
        return node['selectionSet'] !== undefined && node['onType'] !== undefined;
    }
    exports.isInlineFragmentNode = isInlineFragmentNode;
});
//# sourceMappingURL=types.js.map