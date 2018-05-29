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
const jsSHA = require("jssha");
function isValidSHA1(s) {
    return s.match(/[a-fA-F0-9]{40}/) != null;
}
exports.isValidSHA1 = isValidSHA1;
/**
 * Compute the sha of the given string
 * @param {string} s
 * @return {string}
 */
function computeShaOf(s) {
    const shaObj = new jsSHA("SHA-512", "TEXT");
    shaObj.update(s);
    return shaObj.getHash("HEX");
}
exports.computeShaOf = computeShaOf;
//# sourceMappingURL=sha.js.map