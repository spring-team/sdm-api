import { SimpleProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
/**
 * Return an editor to append the given content to the end of the file at the specified path,
 * creating the file with only this content if it doesn't exist.
 * Adds no whitespace.
 * @param {string} content content to append. Should include any whitespace
 * required before it
 * @param {string} path path of the file to append to or create
 * @return {SimpleProjectEditor}
 */
export declare function appendOrCreateFileContent(content: string, path: string): SimpleProjectEditor;
