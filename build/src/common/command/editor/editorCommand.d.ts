import { HandleCommand } from "@atomist/automation-client";
import { EditorOrReviewerParameters } from "@atomist/automation-client/operations/common/params/BaseEditorOrReviewerParameters";
import { EditOneOrAllParameters } from "@atomist/automation-client/operations/common/params/EditOneOrAllParameters";
import { FallbackParams } from "@atomist/automation-client/operations/common/params/FallbackParams";
import { EditorCommandDetails } from "@atomist/automation-client/operations/edit/editorToCommand";
import { AnyProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { EmptyParameters } from "../EmptyParameters";
/**
 * Wrap an editor in a command handler, allowing use of custom parameters.
 * Targeting (targets property) is handled automatically if the parameters
 * do not implement TargetsParams
 * @param edd function to make a fresh editor instance from the params
 * @param name editor name
 * @param paramsMaker parameters factory, typically the name of a class with a no arg constructor
 * @param targets targets parameters. Allows targeting to other source control systems
 * @param details optional details to customize behavior
 * Add intent "edit <name>"
 */
export declare function editorCommand<PARAMS = EmptyParameters>(edd: (params: PARAMS) => AnyProjectEditor, name: string, paramsMaker?: Maker<PARAMS>, details?: Partial<EditorCommandDetails>, targets?: FallbackParams): HandleCommand<EditOneOrAllParameters>;
/**
 * Return a parameters maker that is targeting aware
 * @param {Maker<PARAMS>} paramsMaker
 * @param targets targets parameters to set if necessary
 * @return {Maker<EditorOrReviewerParameters & PARAMS>}
 */
export declare function toEditorOrReviewerParametersMaker<PARAMS>(paramsMaker: Maker<PARAMS>, targets: FallbackParams): Maker<EditorOrReviewerParameters & PARAMS>;
