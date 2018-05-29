"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Demo implementation of DeploymentStatusManager that works only on this SDM node using local state
 */
class InMemoryDeploymentStatusManager {
    constructor() {
        this.frozen = false;
    }
    get isFrozen() {
        return Promise.resolve(this.frozen);
    }
    setFrozen(f) {
        this.frozen = f;
    }
}
exports.InMemoryDeploymentStatusManager = InMemoryDeploymentStatusManager;
//# sourceMappingURL=InMemoryDeploymentStatusManager.js.map