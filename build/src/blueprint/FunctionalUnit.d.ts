import { HandleCommand, HandleEvent } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
/**
 * Unit of functionality that can be added to an Atomist automation.
 */
export interface FunctionalUnit {
    eventHandlers: Array<Maker<HandleEvent<any>>>;
    commandHandlers: Array<Maker<HandleCommand>>;
}
export declare const EmptyFunctionalUnit: FunctionalUnit;
