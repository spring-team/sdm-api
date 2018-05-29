(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../utils/get-root", "./build-selection-set", "./transform-variables", "../debugging", "graphql/language/printer", "../utils/get-directives"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const get_root_1 = require("../utils/get-root");
    const build_selection_set_1 = require("./build-selection-set");
    const transform_variables_1 = require("./transform-variables");
    const debugging_1 = require("../debugging");
    const printer_1 = require("graphql/language/printer");
    const get_directives_1 = require("../utils/get-directives");
    function transformOperation(schema, operationNode) {
        const name = operationNode.name && operationNode.name.value ? operationNode.name.value : '';
        debugging_1.debugLog(`[transformOperation] transforming operation ${name} of type ${operationNode.operation}`);
        const root = get_root_1.getRoot(schema, operationNode);
        const variables = transform_variables_1.transformVariables(schema, operationNode);
        const directives = get_directives_1.getDirectives(schema, operationNode);
        const selectionSet = build_selection_set_1.buildSelectionSet(schema, root, operationNode.selectionSet);
        return Object.assign({ name,
            selectionSet, operationType: operationNode.operation, variables: variables, hasVariables: variables.length > 0, isQuery: operationNode.operation === 'query', isMutation: operationNode.operation === 'mutation', isSubscription: operationNode.operation === 'subscription', document: printer_1.print(operationNode), directives, usesDirectives: Object.keys(directives).length > 0 }, build_selection_set_1.separateSelectionSet(selectionSet));
    }
    exports.transformOperation = transformOperation;
});
//# sourceMappingURL=transform-operation.js.map