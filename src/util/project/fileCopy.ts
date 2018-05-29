import { logger } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { SimpleProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
import { GitCommandGitProject } from "@atomist/automation-client/project/git/GitCommandGitProject";
import { Project } from "@atomist/automation-client/project/Project";
import axios from "axios";

/**
 * Add the downloaded content to the given project
 * @param {string} url url of the content. Must be publicly accessible
 * @param {string} path
 * @return {SimpleProjectEditor}
 */
export function copyFileFromUrl(url: string, path: string): SimpleProjectEditor {
    return async p => {
        const response = await axios.get(url);
        return p.addFile(path, response.data);
    };
}

export interface FileMapping {
    donorPath: string;
    recipientPath: string;
}

/**
 * Take the specified files from the donor project
 * @param {RemoteRepoRef} donorProjectId
 * @param {FileMapping[]} fileMappings
 * @param {ProjectOperationCredentials} credentials
 * @return {SimpleProjectEditor}
 */
export function copyFilesFrom(donorProjectId: RemoteRepoRef,
                              fileMappings: Array<FileMapping | string>,
                              credentials: ProjectOperationCredentials): SimpleProjectEditor {
    return async p => {
        const donorProject = await GitCommandGitProject.cloned(credentials, donorProjectId);
        return copyFiles(donorProject, fileMappings)(p);
    };
}

export function copyFiles(donorProject: Project,
                          fileMappings: Array<FileMapping | string>): SimpleProjectEditor {
    return async p => {
        for (const m of fileMappings) {
            const fm = typeof m === "string" ? {donorPath: m, recipientPath: m} : m;
            const found = await donorProject.getFile(fm.donorPath);
            if (found) {
                await p.addFile(fm.recipientPath, await found.getContent());
            } else {
                logger.warn("Path '%s' not found in donor project %s:%s", fm.donorPath, donorProject.id.owner, donorProject.id.repo);
            }
        }
        return p;
    };
}
