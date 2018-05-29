import { HandleCommand, HandleEvent } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { FunctionalUnit } from "../FunctionalUnit";
/**
 * Assemble multiple functional units into a single functional unit
 */
export declare class ComposedFunctionalUnit implements FunctionalUnit {
    readonly units: FunctionalUnit[];
    constructor(...units: FunctionalUnit[]);
    readonly eventHandlers: Array<Maker<HandleEvent<any>>>;
    readonly commandHandlers: Array<Maker<HandleCommand>>;
}
export declare function composeFunctionalUnits(...units: FunctionalUnit[]): FunctionalUnit;
