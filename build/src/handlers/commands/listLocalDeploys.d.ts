import { HandleCommand } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
/**
 * Return a command handler that can list local deploys
 * @return {HandleCommand<EmptyParameters>}
 */
export declare const listLocalDeploys: Maker<HandleCommand>;
