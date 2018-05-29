/// <reference types="node" />
import { HandlerContext } from "@atomist/automation-client";
import { RepoRef } from "@atomist/automation-client/operations/common/RepoId";
import * as https from "https";
export declare function findLastK8sDeployment(ctx: HandlerContext, rr: RepoRef, branch: string, environment: string): Promise<string>;
export declare const notPicky: {
    httpsAgent: https.Agent;
};
