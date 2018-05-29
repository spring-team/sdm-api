import { Tagger } from "@atomist/automation-client/operations/tagger/Tagger";
import { PushListener } from "../PushListener";
/**
 * Tag the repo using the given tagger
 * @param {Tagger} tagger
 */
export declare function tagRepo(tagger: Tagger): PushListener;
