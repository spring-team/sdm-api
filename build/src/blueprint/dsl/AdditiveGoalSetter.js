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
const _ = require("lodash");
const Goals_1 = require("../../common/delivery/goals/Goals");
/**
 * An additive goal setter assembles the goals contributed by all the contributors.
 */
class AdditiveGoalSetter {
    constructor(name, contributors) {
        this.name = name;
        this.contributors = [];
        this.contributors = contributors.map(c => ({
            name: c.name,
            mapping(p) {
                return __awaiter(this, void 0, void 0, function* () {
                    const r = yield c.mapping(p);
                    if (!r) {
                        return r;
                    }
                    return (Goals_1.isGoals(r)) ? r.goals :
                        Array.isArray(r) ? r : [r];
                });
            },
        }));
    }
    mapping(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const contributorGoals = yield Promise.all(this.contributors.map(c => c.mapping(p)));
            const uniqueGoals = _.uniq(_.flatten(contributorGoals).filter(x => !!x));
            return new Goals_1.Goals(this.name, ...uniqueGoals);
        });
    }
}
/**
 * Contribute goals based on a series of contribution rules.
 * Duplicates will be removed.
 * @param contributor first contributor
 * @param {GoalContribution<F>} contributors
 * @return a mapping to goals
 */
function goalContributors(contributor, ...contributors) {
    return new AdditiveGoalSetter("Built", contributors);
}
exports.goalContributors = goalContributors;
//# sourceMappingURL=AdditiveGoalSetter.js.map