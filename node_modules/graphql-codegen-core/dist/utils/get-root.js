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
    exports.getRoot = (schema, operation) => {
        switch (operation.operation) {
            case 'query':
                return schema.getQueryType();
            case 'mutation':
                return schema.getMutationType();
            case 'subscription':
                return schema.getSubscriptionType();
            default:
                return null;
        }
    };
});
//# sourceMappingURL=get-root.js.map