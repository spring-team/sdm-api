"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PredicateMappingTerm_1 = require("../../common/listener/support/PredicateMappingTerm");
/**
 * Predicate mapping DSL method. Allows use of booleans and functions
 * returning boolean in predicate expressions
 * @param {PushTest} pred1
 * @param {PushTest} preds
 */
function allOf(pred1, ...preds) {
    const asPredicateMappings = [PredicateMappingTerm_1.toPredicateMapping(pred1)].concat(preds.map(PredicateMappingTerm_1.toPredicateMapping));
    return {
        name: asPredicateMappings.map(c => c.name).join(" & "),
        mapping: (pu) => __awaiter(this, void 0, void 0, function* () {
            const result = yield Promise.all(asPredicateMappings.map(pm => pm.mapping(pu)));
            return !result.includes(false);
        }),
    };
}
exports.allOf = allOf;
//# sourceMappingURL=allOf.js.map