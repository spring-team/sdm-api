import { Project } from "@atomist/automation-client/project/Project";
/**
 * Create a filtered view of the given project.
 * Changes to the filtered view will affect the source project.
 * @param {LocalProject} p
 * @param filter function to filter file paths
 * @return {Promise<LocalProject>}
 */
export declare function filteredView<P extends Project = Project>(p: Project, filter: (path: string) => boolean): P;
