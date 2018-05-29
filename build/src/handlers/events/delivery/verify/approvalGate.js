"use strict";
/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalGateParam = "atomist:approve=true";
/**
 * Return a form of this URL for approval
 * @param {string} url
 * @return {string}
 */
function forApproval(url) {
    return url +
        (url.includes("?") ? "&" : "?") +
        exports.ApprovalGateParam;
}
exports.forApproval = forApproval;
function requiresApproval(ghs) {
    return ghs.targetUrl && ghs.targetUrl.endsWith(exports.ApprovalGateParam);
}
exports.requiresApproval = requiresApproval;
function disregardApproval(url) {
    if (!url) {
        return url;
    }
    return url.replace(new RegExp("[\?&]?" + exports.ApprovalGateParam + "$"), "");
}
exports.disregardApproval = disregardApproval;
//# sourceMappingURL=approvalGate.js.map