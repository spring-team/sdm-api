import { SimpleProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
/**
 * Add the downloaded content in the given project
 * @param {string} url url of the content. Must be publicly accessible
 * @param {string} path
 * @return {SimpleProjectEditor}
 */
export declare function stealFile(url: string, path: string): SimpleProjectEditor;
