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
const automation_client_1 = require("@atomist/automation-client");
const ghub_1 = require("../../../../util/github/ghub");
const mavenLogInterpreter_1 = require("../local/maven/mavenLogInterpreter");
const K8AutomationBuildContext = "build/atomist/k8s";
/**
 * Upon recognizing a plan to create an artifact, send a message to k8-automation to request a build.
 * k8-automation will trigger a build for this commit in Google Container Builder.
 * When that is complete, it will send an ImageLinked event, and that means our artifact has been created.
 *
 * The message to k8-automation takes the form of a pending GitHub status.
 * Its response takes the form of a Build event which we will notice and update the Build goal,
 * and an ImageLink event which we will notice and update the Artifact goal with a link to that image.
 */
class K8sAutomationBuilder {
    constructor() {
        this.name = "K8AutomationBuilder";
    }
    initiateBuild(creds, id, ac, push, log, context) {
        // someday we will do this with a "requested" build node but use a status for now.
        return ghub_1.createStatus(creds, id, {
            context: K8AutomationBuildContext + "/" + push.branch,
            state: "pending",
            description: "Requested build in k8-automation",
            target_url: undefined,
        }).then(automation_client_1.success);
    }
    logInterpreter(log) {
        return mavenLogInterpreter_1.MavenLogInterpreter(log);
    }
}
exports.K8sAutomationBuilder = K8sAutomationBuilder;
//# sourceMappingURL=K8AutomationBuilder.js.map