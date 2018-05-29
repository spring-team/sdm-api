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
const child_process_1 = require("child_process");
const sprintf_js_1 = require("sprintf-js");
const strip_ansi = require("strip-ansi");
const DelimitedWriteProgressLogDecorator_1 = require("../../common/log/DelimitedWriteProgressLogDecorator");
/**
 * Default ErrorFinder that regards return code 0 as success
 * @param {number} code
 * @return {boolean}
 * @constructor
 */
exports.SuccessIsReturn0ErrorFinder = code => code !== 0;
/**
 * Spawn a process and watch
 * @param {SpawnCommand} spawnCommand
 * @param options options
 * @param {ProgressLog} log
 * @param {Partial<SpawnWatchOptions>} spOpts
 * @return {Promise<ChildProcessResult>}
 */
function spawnAndWatch(spawnCommand, options, log, spOpts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const childProcess = child_process_1.spawn(spawnCommand.command, spawnCommand.args || [], options);
        automation_client_1.logger.info("%s > %s (spawn with pid=%d)", options.cwd, stringifySpawnCommand(spawnCommand), childProcess.pid);
        return watchSpawned(childProcess, log, spOpts);
    });
}
exports.spawnAndWatch = spawnAndWatch;
/**
 * Handle the result of a spawned process, streaming back
 * output to log
 * @param childProcess
 * @param {ProgressLog} log to write stdout and stderr to
 * @param opts: Options for error parsing, ANSI code stripping etc.
 * @return {Promise<ChildProcessResult>}
 */
function watchSpawned(childProcess, log, opts = {}) {
    return new Promise((resolve, reject) => {
        const optsToUse = Object.assign({ errorFinder: exports.SuccessIsReturn0ErrorFinder, stripAnsi: false }, opts);
        if (!optsToUse.errorFinder) {
            // The caller specified undefined, which is an error. Ignore them, for they know not what they do.
            optsToUse.errorFinder = exports.SuccessIsReturn0ErrorFinder;
        }
        const newLineDelimitedLog = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(log, "\n");
        function sendToLog(data) {
            const formatted = optsToUse.stripAnsi ? strip_ansi(data.toString()) : data.toString();
            return newLineDelimitedLog.write(formatted);
        }
        childProcess.stdout.on("data", sendToLog);
        childProcess.stderr.on("data", sendToLog);
        childProcess.addListener("exit", (code, signal) => {
            automation_client_1.logger.info("Spawn exit (pid=%d): code=%d, signal=%s", childProcess.pid, code, signal);
            resolve({
                error: optsToUse.errorFinder(code, signal, log),
                code,
            });
        });
        childProcess.addListener("error", err => {
            // Process could not be spawned or killed
            automation_client_1.logger.warn("Spawn failure: %s", err);
            reject(err);
        });
    });
}
exports.watchSpawned = watchSpawned;
/**
 * toString for a SpawnCommand. Used for logging.
 * @param {SpawnCommand} sc
 * @return {string}
 */
function stringifySpawnCommand(sc) {
    return sprintf_js_1.sprintf("%s %s", sc.command, !!sc.args ? sc.args.join(" ") : "");
}
exports.stringifySpawnCommand = stringifySpawnCommand;
/**
 * Convenient function to create a spawn command from a sentence such as "npm run compile"
 * Does not respect quoted arguments
 * @param {string} sentence
 * @param options
 * @return {SpawnCommand}
 */
function asSpawnCommand(sentence, options = {}) {
    const split = sentence.split(" ");
    return {
        command: split[0],
        args: split.slice(1),
        options,
    };
}
exports.asSpawnCommand = asSpawnCommand;
/**
 * Kill the child process and wait for it to shut down. This can take a while as child processes
 * may have shut down hooks.
 * @param {module:child_process.ChildProcess} childProcess
 * @return {Promise<any>}
 */
function poisonAndWait(childProcess) {
    childProcess.kill();
    return new Promise((resolve, reject) => childProcess.on("close", () => {
        resolve();
    }));
}
exports.poisonAndWait = poisonAndWait;
//# sourceMappingURL=spawned.js.map