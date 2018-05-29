import { GitProject } from "@atomist/automation-client/project/git/GitProject";
/**
 * Use git to list the files changed since the given sha
 * or undefined if we cannot determine it
 * @param {GitProject} project
 * @param {string} sha
 * @return {Promise<string[]>}
 */
export declare function filesChangedSince(project: GitProject, sha: string): Promise<string[] | undefined>;
export declare function filesChangedSinceParentCommit(project: GitProject): Promise<string[] | undefined>;
export declare type Mod = "added" | "deleted" | "modified" | "renamed";
export interface Change {
    readonly name: string;
    readonly how: Mod;
}
export declare class Rename implements Change {
    name: string;
    newName: string;
    readonly how: Mod;
    constructor(name: string, newName: string);
}
export declare function changesSince(project: GitProject, sha: string): Promise<string[]>;
/**
 * Does a file satisfying this text exist within the set of changed files?
 * @param {string[]} changedFilePaths
 * @param {string[]} test test for the file change
 * @return {boolean}
 */
export declare function anyFileChangedSuchThat(changedFilePaths: string[], test: (path: string) => boolean): boolean;
export declare function anyFileChangedWithExtension(changedFilePaths: string[], extensions: string[]): boolean;
