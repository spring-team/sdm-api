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
const automation_client_1 = require("@atomist/automation-client");
const _ = require("lodash");
const Goals_1 = require("../../common/delivery/goals/Goals");
const GoalComponent_1 = require("./GoalComponent");
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
                    return GoalComponent_1.toGoals(r).goals;
                });
            },
        }));
    }
    mapping(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const contributorGoals = yield Promise.all(this.contributors.map(c => c.mapping(p)));
            const uniqueGoals = _.uniq(_.flatten(contributorGoals.filter(x => !!x)));
            automation_client_1.logger.info("Unique goal names=[%s]: correlationId=%s", uniqueGoals.map(g => g.name), p.context.correlationId);
            return uniqueGoals.length === 0 ?
                undefined :
                new Goals_1.Goals(this.name, ...uniqueGoals);
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
    return new AdditiveGoalSetter("Contributed", [contributor].concat(contributors));
}
exports.goalContributors = goalContributors;
//# sourceMappingURL=goalContribution.js.map