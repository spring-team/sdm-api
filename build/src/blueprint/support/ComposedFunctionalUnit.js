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
const _ = require("lodash");
/**
 * Assemble multiple functional units into a single functional unit
 */
class ComposedFunctionalUnit {
    constructor(...units) {
        this.units = units;
    }
    get eventHandlers() {
        return _.flatten(this.units.map(dm => dm.eventHandlers))
            .filter(m => !!m);
    }
    get commandHandlers() {
        return _.flatten(this.units.map(dm => dm.commandHandlers));
    }
}
exports.ComposedFunctionalUnit = ComposedFunctionalUnit;
function composeFunctionalUnits(...units) {
    return new ComposedFunctionalUnit(...units);
}
exports.composeFunctionalUnits = composeFunctionalUnits;
//# sourceMappingURL=ComposedFunctionalUnit.js.map