import { SimpleProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { Project } from "@atomist/automation-client/project/Project";
/**
 * Add the downloaded content to the given project
 * @param {string} url url of the content. Must be publicly accessible
 * @param {string} path
 * @return {SimpleProjectEditor}
 */
export declare function copyFileFromUrl(url: string, path: string): SimpleProjectEditor;
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
export declare function copyFilesFrom(donorProjectId: RemoteRepoRef, fileMappings: Array<FileMapping | string>, credentials: ProjectOperationCredentials): SimpleProjectEditor;
export declare function copyFiles(donorProject: Project, fileMappings: Array<FileMapping | string>): SimpleProjectEditor;
