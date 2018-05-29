import { ProjectLoader, ProjectLoadingParameters, WithLoadedProject } from "./ProjectLoader";
/**
 * Caching implementation of ProjectLoader
 */
export declare class CachingProjectLoader implements ProjectLoader {
    private readonly cache;
    constructor(maxEntries?: number);
    doWithProject<T>(params: ProjectLoadingParameters, action: WithLoadedProject<T>): Promise<T>;
}
