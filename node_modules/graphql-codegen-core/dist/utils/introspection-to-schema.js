(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "graphql"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const graphql_1 = require("graphql");
    exports.validateIntrospection = (schema) => {
        if (!schema.__schema) {
            throw new Error('Invalid schema provided!');
        }
    };
    function introspectionToGraphQLSchema(introspectionQuery) {
        exports.validateIntrospection(introspectionQuery);
        return graphql_1.buildClientSchema(introspectionQuery);
    }
    exports.introspectionToGraphQLSchema = introspectionToGraphQLSchema;
});
//# sourceMappingURL=introspection-to-schema.js.map