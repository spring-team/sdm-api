import { Project } from "@atomist/automation-client/project/Project";
import { AppInfo } from "../../../../../spi/deploy/Deployment";
import { InterpretLog } from "../../../../../spi/log/InterpretedLog";
import { SpawnCommand } from "../../../../../util/misc/spawned";
import { ProjectLoader } from "../../../../repo/ProjectLoader";
import { SpawnBuilder, SpawnBuilderOptions } from "../SpawnBuilder";
export declare const RunBuild: SpawnCommand;
export declare function leinBuilder(projectLoader: ProjectLoader, ...commands: string[]): SpawnBuilder;
export declare const leinLogInterpreter: InterpretLog;
export declare function leinBuilderOptions(commands: SpawnCommand[]): SpawnBuilderOptions;
export declare function projectCljToAppInfo(p: Project): Promise<AppInfo>;
