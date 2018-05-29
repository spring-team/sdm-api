import { RemoteLocator } from "@atomist/automation-client/operations/common/params/RemoteLocator";
import { NewRepoCreationParameters } from "@atomist/automation-client/operations/generate/NewRepoCreationParameters";
import { SeedDrivenGeneratorParameters } from "@atomist/automation-client/operations/generate/SeedDrivenGeneratorParameters";
import { GeneratorConfig } from "./GeneratorConfig";
/**
 * Convenient base class for project generator parameters.
 */
export declare class SeedDrivenGeneratorParametersSupport implements SeedDrivenGeneratorParameters {
    private readonly config;
    screenName: string;
    addAtomistWebhook: boolean;
    version: string;
    seed: string;
    target: NewRepoCreationParameters;
    slackTeam: string;
    readonly description: string;
    /**
     * Resolve the seed repo
     * @return {RemoteLocator}
     */
    readonly source: RemoteLocator;
    protected constructor(config: GeneratorConfig);
}
