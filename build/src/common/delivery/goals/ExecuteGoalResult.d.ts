import { HandlerResult } from "@atomist/automation-client";
export interface ExecuteGoalResult extends HandlerResult {
    targetUrl?: string;
    requireApproval?: boolean;
}
