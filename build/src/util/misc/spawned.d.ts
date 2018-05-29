/// <reference types="node" />
import { ChildProcess, SpawnOptions } from "child_process";
import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * Type that can react to the exit of a spawned child process, after
 * Node has terminated without reporting an error.
 * This is necessary only for commands that can return
 * a non-zero exit code on success.
 * @return whether this result should be considered an error.
 */
export declare type ErrorFinder = (code: number, signal: string, log: ProgressLog) => boolean;
/**
 * Default ErrorFinder that regards return code 0 as success
 * @param {number} code
 * @return {boolean}
 * @constructor
 */
export declare const SuccessIsReturn0ErrorFinder: ErrorFinder;
export interface ChildProcessResult {
    error: boolean;
    code: number;
    message?: string;
}
export interface SpawnWatchOptions {
    errorFinder: ErrorFinder;
    stripAnsi: boolean;
}
/**
 * Spawn a process and watch
 * @param {SpawnCommand} spawnCommand
 * @param options options
 * @param {ProgressLog} log
 * @param {Partial<SpawnWatchOptions>} spOpts
 * @return {Promise<ChildProcessResult>}
 */
export declare function spawnAndWatch(spawnCommand: SpawnCommand, options: SpawnOptions, log: ProgressLog, spOpts?: Partial<SpawnWatchOptions>): Promise<ChildProcessResult>;
/**
 * Handle the result of a spawned process, streaming back
 * output to log
 * @param childProcess
 * @param {ProgressLog} log to write stdout and stderr to
 * @param opts: Options for error parsing, ANSI code stripping etc.
 * @return {Promise<ChildProcessResult>}
 */
export declare function watchSpawned(childProcess: ChildProcess, log: ProgressLog, opts?: Partial<SpawnWatchOptions>): Promise<ChildProcessResult>;
/**
 * The first two arguments to Node spawn
 */
export interface SpawnCommand {
    command: string;
    args?: string[];
    options?: any;
}
/**
 * toString for a SpawnCommand. Used for logging.
 * @param {SpawnCommand} sc
 * @return {string}
 */
export declare function stringifySpawnCommand(sc: SpawnCommand): string;
/**
 * Convenient function to create a spawn command from a sentence such as "npm run compile"
 * Does not respect quoted arguments
 * @param {string} sentence
 * @param options
 * @return {SpawnCommand}
 */
export declare function asSpawnCommand(sentence: string, options?: SpawnOptions): SpawnCommand;
/**
 * Kill the child process and wait for it to shut down. This can take a while as child processes
 * may have shut down hooks.
 * @param {module:child_process.ChildProcess} childProcess
 * @return {Promise<any>}
 */
export declare function poisonAndWait(childProcess: ChildProcess): Promise<any>;
