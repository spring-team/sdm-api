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
const spawned_1 = require("../../../../../util/misc/spawned");
const LocalBuilder_1 = require("../LocalBuilder");
const mavenLogInterpreter_1 = require("./mavenLogInterpreter");
const pomParser_1 = require("./pomParser");
/**
 * Build with Maven in the local automation client.
 * This implementation requires Java and maven on the classpath.
 * Note it is NOT intended for use for multiple organizations. It's OK
 * for one organization to use inside its firewall, but there is potential
 * vulnerability in builds of unrelated tenants getting at each others
 * artifacts.
 */
class MavenBuilder extends LocalBuilder_1.LocalBuilder {
    constructor(artifactStore, logFactory, projectLoader, skipTests = true) {
        super("MavenBuilder", artifactStore, projectLoader);
        this.skipTests = skipTests;
        this.logInterpreter = mavenLogInterpreter_1.MavenLogInterpreter;
    }
    startBuild(credentials, id, atomistTeam, log, addressChannels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.projectLoader.doWithProject({ credentials, id, readOnly: true }, (p) => __awaiter(this, void 0, void 0, function* () {
                // Find the artifact info from Maven
                const pom = yield p.findFile("pom.xml");
                const content = yield pom.getContent();
                const va = yield pomParser_1.identification(content);
                const appId = Object.assign({}, va, { name: va.artifact, id });
                const cmd = "mvn package" + (this.skipTests ? " -DskipTests" : "");
                const buildResult = spawned_1.spawnAndWatch(spawned_1.asSpawnCommand(cmd), {
                    cwd: p.baseDir,
                }, log, {
                    errorFinder: (code, signal, l) => l.log.includes("[ERROR]"),
                });
                const rb = new UpdatingBuild(id, buildResult, atomistTeam, log.url);
                rb.ai = appId;
                rb.deploymentUnitFile = `${p.baseDir}/target/${appId.name}-${appId.version}.jar`;
                return rb;
            }));
        });
    }
}
exports.MavenBuilder = MavenBuilder;
class UpdatingBuild {
    constructor(repoRef, buildResult, team, url) {
        this.repoRef = repoRef;
        this.buildResult = buildResult;
        this.team = team;
        this.url = url;
    }
    get appInfo() {
        return this.ai;
    }
}
//# sourceMappingURL=MavenBuilder.js.map