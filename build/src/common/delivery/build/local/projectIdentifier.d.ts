import { Project } from "@atomist/automation-client/project/Project";
export interface ProjectIdentification {
    name: string;
    version: string;
}
/**
 * Return identification of this project or undefined if it can't be identified
 */
export declare type ProjectIdentifier = (p: Project) => Promise<ProjectIdentification | undefined>;
