import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import * as slack from "@atomist/slack-messages/SlackMessages";
import { AddressChannels } from "../../common/slack/addressChannels";
import { InterpretedLog } from "../../spi/log/InterpretedLog";
export declare function reportFailureInterpretationToLinkedChannels(stepName: string, interpretation: InterpretedLog | undefined, fullLog: {
    url?: string;
    log: string;
}, id: RemoteRepoRef, addressChannels: AddressChannels, retryButton?: slack.Action): Promise<void>;
