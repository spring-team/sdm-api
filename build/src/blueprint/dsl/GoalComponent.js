"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Goals_1 = require("../../common/delivery/goals/Goals");
function toGoals(gc) {
    return Goals_1.isGoals(gc) ? gc :
        Array.isArray(gc) ? new Goals_1.Goals(gc.map(g => g.name).join("/"), ...gc) :
            new Goals_1.Goals("Solely " + gc.name, gc);
}
exports.toGoals = toGoals;
//# sourceMappingURL=GoalComponent.js.map