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

import { HandleCommand, HandlerContext } from "@atomist/automation-client";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Project } from "@atomist/automation-client/project/Project";
import { editorCommand } from "../../common/command/editor/editorCommand";
import { EmptyParameters } from "../../common/command/EmptyParameters";
import { LanguageReport, reportForLanguages } from "../../util/sloc/slocReport";

/**
 * Commmand to display lines of code in current project
 * to Slack, across understood languages.
 * @type {HandleCommand<EditOneOrAllParameters>}
 */
export const slocCommand: HandleCommand = editorCommand<EmptyParameters>(
    () => computeSloc,
    "sloc",
    EmptyParameters, {
        intent: ["compute sloc", "sloc"],
    });

async function computeSloc(p: Project, ctx: HandlerContext, params: EmptyParameters) {
    const report = await reportForLanguages(p);
    await ctx.messageClient.respond(`Project \`${p.id.owner}:${p.id.repo}\`: ${(p.id as RemoteRepoRef).url}`);
    const message = report.relevantLanguageReports.map(formatLanguageReport).join("\n");
    await ctx.messageClient.respond(message);
    return p;
}

function formatLanguageReport(report: LanguageReport): string {
    return `*${report.language.name}*: ${Number(report.stats.total).toLocaleString()} loc, ` +
        `${Number(report.stats.comment).toLocaleString()} in comments, ` +
        `${Number(report.fileReports.length).toLocaleString()} \`.${report.language.extensions[0]}\` files`;
}
