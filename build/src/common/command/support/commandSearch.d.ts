import { HandleCommand } from "@atomist/automation-client";
import { CommandHandlerMetadata } from "@atomist/automation-client/metadata/automationMetadata";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { FunctionalUnit } from "../../../blueprint/FunctionalUnit";
export interface HandlerInfo {
    maker: Maker<HandleCommand<any>>;
    instance: HandleCommand<any> & CommandHandlerMetadata;
}
/**
 * Return command handlers with a given tag.
 * Note this may not find all, but it will find those that know their
 * own metadata, which is true of all those returned by generatorHandler
 * and the underlying commandHandlerFrom
 * @param {FunctionalUnit} unit
 * @param {string} tag
 */
export declare function commandHandlersWithTag(unit: FunctionalUnit, tag: string): HandlerInfo[];
/**
 * Return command handlers along with their metadata
 * Note this may not find all, but it will find those that know their
 * own metadata
 * @param {FunctionalUnit} unit
 */
export declare function selfDescribingHandlers(unit: FunctionalUnit): HandlerInfo[];
