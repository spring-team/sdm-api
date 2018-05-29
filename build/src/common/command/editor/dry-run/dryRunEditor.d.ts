import { HandleCommand } from "@atomist/automation-client";
import { EditOneOrAllParameters } from "@atomist/automation-client/operations/common/params/EditOneOrAllParameters";
import { FallbackParams } from "@atomist/automation-client/operations/common/params/FallbackParams";
import { EditorCommandDetails } from "@atomist/automation-client/operations/edit/editorToCommand";
import { AnyProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { EmptyParameters } from "../../EmptyParameters";
export declare const DryRunContext = "atomist-dry-run";
/**
 * Wrap an editor in a command handler that sets a dry run status.
 * Typically used to wait for build success or failure, resulting in issue or PR.
 * Allows use of custom parameters as in editorCommand
 * Targeting (targets property) is handled automatically if the parameters
 * do not implement TargetsParams
 * @param edd function to make a fresh editor instance from the params
 * @param name editor name
 * @param paramsMaker parameters factory, typically the name of a class with a no arg constructor
 * @param details optional details to customize behavior
 * @param targets targets parameters. Allows targeting to other source control systems
 * Add intent "try edit <name>"
 */
export declare function dryRunEditor<PARAMS = EmptyParameters>(edd: (params: PARAMS) => AnyProjectEditor, paramsMaker: Maker<PARAMS>, name: string, details?: Partial<EditorCommandDetails<PARAMS>>, targets?: FallbackParams): HandleCommand<EditOneOrAllParameters>;
