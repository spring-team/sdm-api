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

import { AtomistBuildFile } from "../../../../delivery/build/local/npm/NpmDetectBuildMapping";
import { PredicatePushTest, predicatePushTest } from "../../../PushTest";
import { hasFile } from "../commonPushTests";

export const IsNode: PredicatePushTest = predicatePushTest("Is Node", async p => {
    try {
        const f = await p.findFile("package.json");
        const contents = await f.getContent();
        JSON.parse(contents);
        return true;
    } catch (err) {
        return false;
    }
});

export const IsAtomistAutomationClient = hasFile("src/atomist.config.ts");

export const HasAtomistBuildFile = hasFile(AtomistBuildFile);
