import { HandlerContext } from "@atomist/automation-client";
import { ScmProvider } from "../../typings/types";
export declare const GitHubDotComProviderId = "zjlmxjzwhurspem";
export declare function fetchProvider(context: HandlerContext, providerId: string): Promise<ScmProvider.ScmProvider>;
