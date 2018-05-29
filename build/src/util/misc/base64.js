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
const base64 = require("base64-js");
/**
 * Base 64 encode the given string
 * @param {string} str
 * @return {string}
 */
function encode(str) {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return base64.fromByteArray(arr);
}
exports.encode = encode;
/**
 * Decode the given Base 64 string
 * @param {string} coded
 * @return {string}
 */
function decode(coded) {
    const decoded = base64.toByteArray(coded);
    return String.fromCharCode.apply(null, decoded);
}
exports.decode = decode;
//# sourceMappingURL=base64.js.map