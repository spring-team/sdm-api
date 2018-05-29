import { Project } from "@atomist/automation-client/project/Project";
import { ProjectLoader, ProjectLoadingParameters, WithLoadedProject } from "../../common/repo/ProjectLoader";
/**
 * ProjectLoader that can only return one project.
 * Normally used in testing.
 */
export declare class SingleProjectLoader implements ProjectLoader {
    private readonly project;
    constructor(project: Project);
    doWithProject<T>(params: ProjectLoadingParameters, action: WithLoadedProject<T>): Promise<T>;
}
