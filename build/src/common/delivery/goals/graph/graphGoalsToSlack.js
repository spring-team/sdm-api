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
const configuration_1 = require("@atomist/automation-client/configuration");
const axios_1 = require("axios");
const https = require("https");
const _ = require("lodash");
const gitHubContext_1 = require("../support/github/gitHubContext");
/**
 * Display a graph of the goals that have just been set to Slack
 * @param {GoalsSetListenerInvocation} gsi
 * @return {Promise<any>}
 * @constructor
 */
exports.GraphGoalsToSlack = (gsi) => __awaiter(this, void 0, void 0, function* () {
    const graphvizServiceUrl = configuration_1.configurationValue("sdm.graphviz.url", null);
    if (!graphvizServiceUrl) {
        return;
    }
    if (!gsi.goalSet) {
        return;
    }
    try {
        const graphDefinition = goalsToDot(gsi.goalSet);
        automation_client_1.logger.debug("ShowGraph: generated .dot: " + graphDefinition);
        const generateGraphUrl = graphvizServiceUrl + "/dot/png";
        const generateGraphResponse = yield askForGraph(generateGraphUrl, graphDefinition);
        const graphImageRelativePath = generateGraphResponse.goalGraphUrl;
        if (!graphImageRelativePath) {
            automation_client_1.logger.info("ShowGraph: No image path returned from graphvizService");
            return;
        }
        const showGraphMessage = {
            attachments: [{
                    fallback: "dependency goal graph goes here",
                    text: "Graph of planned goal set: " + gsi.goalSet.name,
                    image_url: graphvizServiceUrl + "/" + graphImageRelativePath,
                }],
        };
        return gsi.addressChannels(showGraphMessage);
    }
    catch (err) {
        // do not fail anything. The graphing service has an SLA of "good luck"
        automation_client_1.logger.warn("ShowGraph: Unable to generate a cool graph of the goalSet: " + err.message);
        automation_client_1.logger.warn("ShowGraph: URL: " + graphvizServiceUrl);
        automation_client_1.logger.warn("ShowGraph: stack trace: " + err.stack);
    }
});
function askForGraph(generateGraphUrl, graphDefinition) {
    return __awaiter(this, void 0, void 0, function* () {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        const generateGraphResponse = yield axios_1.default.post(generateGraphUrl, graphDefinition, { headers: { "Content-Type": "text/plain" }, httpsAgent: agent });
        automation_client_1.logger.debug("ShowGraph: got from %s: %j", generateGraphUrl, generateGraphResponse);
        return generateGraphResponse.data;
    });
}
function goalsToDot(goals) {
    const nodeAttributes = goals.goals.map(g => `${validDotName(g)} [label="${g.name}"]`);
    const edges = goals.goals.map(g => {
        const precursors = g.dependsOn || [];
        return precursors.map(p => `${validDotName(p)} -> ${validDotName(g)}`);
    });
    const edgeAttributes = _.flatten(edges);
    return `digraph ${validDotIdentifier(goals.name)} {
    fontname="Arial";
    splines="polyline";
    rankdir="LR";
    edge [arrowhead="vee"];
    node [shape=box, fontname="Arial", style="rounded"];

    ${nodeAttributes.join("\n    ")}

    ${edgeAttributes.join("\n    ")}
}
`;
}
exports.goalsToDot = goalsToDot;
function validDotName(g) {
    const parts = gitHubContext_1.splitContext(g.context);
    const startAtName = parts.env + "_" + parts.goalName;
    return validDotIdentifier(startAtName);
}
function validDotIdentifier(s) {
    return s.replace(/[-\s.]/g, "_");
}
//# sourceMappingURL=graphGoalsToSlack.js.map