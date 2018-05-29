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
exports.JavaLanguage = { name: "Java", extensions: ["java"] };
exports.KotlinLanguage = { name: "Kotlin", extensions: ["kt"] };
exports.ClojureLanguage = { name: "Clojure", extensions: ["clj"] };
exports.ScalaLanguage = { name: "Scala", extensions: ["scala"] };
exports.PythonLanguage = { name: "Python", extensions: ["py"] };
exports.RustLanguage = { name: "Rust", extensions: ["rs"] };
exports.GoLanguage = { name: "Go", extensions: ["go"] };
exports.TypeScriptLanguage = { name: "TypeScript", extensions: ["ts"] };
exports.JavaScriptLanguage = { name: "JavaScript", extensions: ["js"] };
/**
 * All languages for which we can compute statistics
 * @type {Language[]}
 */
exports.AllLanguages = [
    exports.JavaLanguage, exports.KotlinLanguage, exports.ClojureLanguage, exports.ScalaLanguage,
    exports.TypeScriptLanguage, exports.JavaScriptLanguage,
    exports.PythonLanguage, exports.RustLanguage,
    exports.GoLanguage,
];
//# sourceMappingURL=languages.js.map