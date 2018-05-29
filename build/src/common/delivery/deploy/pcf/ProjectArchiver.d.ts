/// <reference types="node" />
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { ReadStream } from "fs";
import { DeployableArtifact } from "../../../../spi/artifact/ArtifactStore";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
export declare class ProjectArchiver {
    private readonly log;
    constructor(log: ProgressLog);
    archive(p: GitProject, da: DeployableArtifact): Promise<ReadStream>;
}
