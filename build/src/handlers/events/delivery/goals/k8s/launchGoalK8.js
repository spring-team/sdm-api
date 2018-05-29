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
const configuration_1 = require("@atomist/automation-client/configuration");
const fs = require("fs-extra");
const path = require("path");
const StringCapturingProgressLog_1 = require("../../../../../common/log/StringCapturingProgressLog");
const spawned_1 = require("../../../../../util/misc/spawned");
/**
 * Launch a goal as a kubernetes job
 * @param {OnAnyRequestedSdmGoal.SdmGoal} goal
 * @param {HandlerContext} ctx
 * @param {ProgressLog} progressLog
 * @returns {Promise<HandlerResult>}
 * @constructor
 */
exports.KubernetesIsolatedGoalLauncher = (goal, ctx, progressLog) => __awaiter(this, void 0, void 0, function* () {
    const deploymentName = process.env.ATOMIST_DEPLOYMENT_NAME || configuration_1.configurationValue("name");
    const deploymentNamespace = process.env.ATOMIST_DEPLOYMENT_NAMESPACE || "default";
    const log = new StringCapturingProgressLog_1.StringCapturingProgressLog();
    let result = yield spawned_1.spawnAndWatch({
        command: "kubectl",
        args: ["get", "deployment", deploymentName, "-n", deploymentNamespace, "-o", "json"],
    }, {}, log, {
        errorFinder: code => code !== 0,
    });
    if (result.code !== 0) {
        return result;
    }
    const jobSpec = JSON.parse(JobSpec);
    const containerSpec = JSON.parse(log.log).spec.template.spec;
    jobSpec.spec.template.spec = containerSpec;
    jobSpec.metadata.name =
        `${deploymentName}-job-${goal.goalSetId.slice(0, 7)}-${goal.uniqueName.toLocaleLowerCase()}`;
    jobSpec.metadata.namespace = deploymentNamespace;
    jobSpec.spec.template.spec.restartPolicy = "Never";
    jobSpec.spec.template.spec.containers[0].name = jobSpec.metadata.name;
    jobSpec.spec.template.spec.containers[0].env.push({
        name: "ATOMIST_JOB_NAME",
        value: jobSpec.metadata.name,
    }, {
        name: "ATOMIST_GOAL_TEAM",
        value: ctx.teamId,
    }, {
        name: "ATOMIST_GOAL_TEAM_NAME",
        value: ctx.context.teamName,
    }, {
        name: "ATOMIST_GOAL_ID",
        value: goal.id,
    }, {
        name: "ATOMIST_CORRELATION_ID",
        value: ctx.correlationId,
    }, {
        name: "ATOMIST_ISOLATED_GOAL",
        value: "true",
    });
    const tempfile = require("tempfile")(".json");
    yield fs.writeFile(tempfile, JSON.stringify(jobSpec, null, 2));
    // Check if this job was previously launched
    result = yield spawned_1.spawnAndWatch({
        command: "kubectl",
        args: ["get", "job", jobSpec.metadata.name, "-n", deploymentNamespace],
    }, {}, progressLog, {
        errorFinder: code => code !== 0,
    });
    if (result.code !== 0) {
        return spawned_1.spawnAndWatch({
            command: "kubectl",
            args: ["apply", "-f", tempfile],
        }, {}, progressLog, {
            errorFinder: code => code !== 0,
        });
    }
    else {
        return spawned_1.spawnAndWatch({
            command: "kubectl",
            args: ["replace", "--force", "-f", tempfile],
        }, {}, progressLog, {
            errorFinder: code => code !== 0,
        });
    }
    // query kube to make sure the job got scheduled
    // kubectl get job <jobname> -o json
});
const JobSpec = `{
    "kind" : "Job",
    "apiVersion" : "batch/v1",
    "metadata" : {
      "name" : "sample-sdm-job",
      "namespace" : "default"
    },
    "spec" : {
      "template" : {
        "spec" : {
          "containers" : []
        }
      }
    }
  }`;
/**
 * Sets kubernetes deployment specific data to an SdmGoal
 * @param {SdmGoal} goal
 * @param {KubernetesOptions} options
 * @param {GitProject} p
 * @returns {Promise<SdmGoal>}
 */
function createKubernetesData(goal, options, p) {
    return __awaiter(this, void 0, void 0, function* () {
        const deploymentSpec = yield readKubernetesSpec(p, "deployment.json");
        const serviceSpec = yield readKubernetesSpec(p, "service.json");
        return Object.assign({}, goal, { data: JSON.stringify({
                kubernetes: Object.assign({}, options, { deploymentSpec,
                    serviceSpec }),
            }) });
    });
}
exports.createKubernetesData = createKubernetesData;
function readKubernetesSpec(p, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const specPath = path.join(".atomist", "kubernetes", name);
        if (p.fileExistsSync(specPath)) {
            return (yield p.getFile(specPath)).getContent();
        }
        else {
            return undefined;
        }
    });
}
//# sourceMappingURL=launchGoalK8.js.map