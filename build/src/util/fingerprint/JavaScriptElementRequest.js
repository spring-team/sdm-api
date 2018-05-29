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
const TypeScriptFileParser_1 = require("@atomist/automation-client/tree/ast/typescript/TypeScriptFileParser");
/**
 * Request for all JavaScript functions
 */
exports.JavaScriptElementRequest = {
    fileParser: TypeScriptFileParser_1.TypeScriptES6FileParser,
    pathExpression: "//FunctionDeclaration",
    globPattern: "**/*.js",
    extractIdentifier: m => {
        const ids = m.evaluateExpression("//Identifier");
        return ids[0].$value;
    },
};
//# sourceMappingURL=JavaScriptElementRequest.js.map