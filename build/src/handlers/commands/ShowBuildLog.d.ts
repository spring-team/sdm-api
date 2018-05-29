import { HandleCommand } from "@atomist/automation-client";
import { LogInterpretation } from "../../spi/log/InterpretedLog";
export declare class DisplayBuildLogParameters {
    githubToken: string;
    owner: string;
    repo: string;
    sha?: string;
}
export declare function displayBuildLogHandler(logInterpretation?: LogInterpretation): HandleCommand<DisplayBuildLogParameters>;
