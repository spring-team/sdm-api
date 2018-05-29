(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "graphql", "./build-selection-set", "../debugging", "graphql/language/printer", "../utils/get-directives"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const graphql_1 = require("graphql");
    const build_selection_set_1 = require("./build-selection-set");
    const debugging_1 = require("../debugging");
    const printer_1 = require("graphql/language/printer");
    const get_directives_1 = require("../utils/get-directives");
    function transformFragment(schema, fragment) {
        debugging_1.debugLog(`[transformFragment] transforming fragment ${fragment.name.value} on type ${fragment.typeCondition.name.value}`);
        const root = graphql_1.typeFromAST(schema, fragment.typeCondition);
        const name = fragment.name.value;
        const onType = fragment.typeCondition.name.value;
        const directives = get_directives_1.getDirectives(schema, fragment);
        const selectionSet = build_selection_set_1.buildSelectionSet(schema, root, fragment.selectionSet);
        return Object.assign({ name,
            onType,
            selectionSet, document: printer_1.print(fragment), directives, usesDirectives: Object.keys(directives).length > 0 }, build_selection_set_1.separateSelectionSet(selectionSet));
    }
    exports.transformFragment = transformFragment;
});
//# sourceMappingURL=transform-fragment-document.js.map