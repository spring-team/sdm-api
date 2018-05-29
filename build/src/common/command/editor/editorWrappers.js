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
const automation_client_1 = require("@atomist/automation-client");
const projectEditor_1 = require("@atomist/automation-client/operations/edit/projectEditor");
const child_process_1 = require("child_process");
const confirmEditedness_1 = require("../../../util/git/confirmEditedness");
const spawned_1 = require("../../../util/misc/spawned");
const LoggingProgressLog_1 = require("../../log/LoggingProgressLog");
/**
 * Decorate an editor factory to make editors it creates chatty, so they respond to
 * Slack if there's nothing for them to do
 * @param editorName name of the editor
 * @param {(params: PARAMS) => AnyProjectEditor} f
 * @return {(params: PARAMS) => AnyProjectEditor}
 */
function chattyEditorFactory(editorName, f) {
    return params => {
        const underlyingEditor = f(params);
        return chattyEditor(editorName, underlyingEditor);
    };
}
exports.chattyEditorFactory = chattyEditorFactory;
/**
 * Wrap this editor to make it chatty, so it responds to
 * Slack if there's nothing to do
 * @param editorName name of the editor
 * @param {AnyProjectEditor} underlyingEditor
 * @return {(project: GitProject, context, parms) => Promise<any | EditResult>}
 */
function chattyEditor(editorName, underlyingEditor) {
    return (project, context, parms) => __awaiter(this, void 0, void 0, function* () {
        const id = project.id;
        try {
            const tentativeEditResult = yield projectEditor_1.toEditor(underlyingEditor)(project, context, parms);
            const editResult = yield confirmEditedness_1.confirmEditedness(tentativeEditResult);
            automation_client_1.logger.debug("chattyEditor %s: git status on %j is %j: editResult=%j", editorName, project.id, yield project.gitStatus(), editResult);
            if (!editResult.edited) {
                yield context.messageClient.respond(`*${editorName}*: Nothing to do on \`${id.url}\``);
            }
            return editResult;
        }
        catch (err) {
            yield context.messageClient.respond(`*${editorName}*: Nothing done on \`${id.url}\``);
            automation_client_1.logger.warn("Editor error acting on %j: %s", project.id, err);
            return { target: project, edited: false, success: false };
        }
    });
}
exports.chattyEditor = chattyEditor;
/**
 * Create a project editor wrapping spawned local commands
 * run on the project. For example, allows use of tslint as an editor.
 * @param {SpawnCommand[]} commands to execute
 * @param log progress log (optional, stream to console if not passed in)
 * @return {ProjectEditor}
 */
function localCommandsEditor(commands, log = new LoggingProgressLog_1.LoggingProgressLog("commands")) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const opts = {
            cwd: p.baseDir,
        };
        let commandResult;
        for (const cmd of commands) {
            automation_client_1.logger.info("Executing command %s", spawned_1.stringifySpawnCommand(cmd));
            commandResult = yield spawned_1.watchSpawned(child_process_1.spawn(cmd.command, cmd.args, Object.assign({}, opts, cmd.options)), log, {
                errorFinder: (code, signal) => code !== 0,
                stripAnsi: true,
            });
            if (commandResult.error) {
                automation_client_1.logger.warn("Error in command %s: %s", spawned_1.stringifySpawnCommand(cmd), commandResult.error);
                break;
            }
        }
        const status = yield p.gitStatus();
        return { edited: !status.isClean, target: p, success: !commandResult.error };
    });
}
exports.localCommandsEditor = localCommandsEditor;
//# sourceMappingURL=editorWrappers.js.map