import { HandlerContext } from "@atomist/automation-client";
import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { Tagger } from "@atomist/automation-client/operations/tagger/Tagger";
import { AddressChannels } from "../slack/addressChannels";
/**
 * Run a tagger and publish tags for this repo
 * @param {Tagger} tagger
 * @param {GitHubRepoRef} id
 * @param {ProjectOperationCredentials} credentials
 * @param {AddressChannels} addressChannels
 * @param {HandlerContext} ctx
 */
export declare function publishTags(tagger: Tagger, id: GitHubRepoRef, credentials: ProjectOperationCredentials, addressChannels: AddressChannels, ctx: HandlerContext): Promise<any>;
