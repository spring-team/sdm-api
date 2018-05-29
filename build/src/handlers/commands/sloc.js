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
const editorCommand_1 = require("../../common/command/editor/editorCommand");
const EmptyParameters_1 = require("../../common/command/EmptyParameters");
const slocReport_1 = require("../../util/sloc/slocReport");
/**
 * Commmand to display lines of code in current project
 * to Slack, across understood languages.
 * @type {HandleCommand<EditOneOrAllParameters>}
 */
exports.slocCommand = editorCommand_1.editorCommand(() => computeSloc, "sloc", EmptyParameters_1.EmptyParameters, {
    intent: ["compute sloc", "sloc"],
});
function computeSloc(p, ctx, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const report = yield slocReport_1.reportForLanguages(p);
        yield ctx.messageClient.respond(`Project \`${p.id.owner}:${p.id.repo}\`: ${p.id.url}`);
        const message = report.relevantLanguageReports.map(formatLanguageReport).join("\n");
        yield ctx.messageClient.respond(message);
        return p;
    });
}
function formatLanguageReport(report) {
    return `*${report.language.name}*: ${Number(report.stats.total).toLocaleString()} loc, ` +
        `${Number(report.stats.comment).toLocaleString()} in comments, ` +
        `${Number(report.fileReports.length).toLocaleString()} \`.${report.language.extensions[0]}\` files`;
}
//# sourceMappingURL=sloc.js.map