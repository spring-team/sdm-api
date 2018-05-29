import { EditResult } from "@atomist/automation-client/operations/edit/projectEditor";
/**
 * Try to work out whether a project was edited, looking at git status
 * if we can't find out from the edit result
 * @param {EditResult} editResult
 * @return {Promise<EditResult>}
 */
export declare function confirmEditedness(editResult: EditResult): Promise<EditResult>;
