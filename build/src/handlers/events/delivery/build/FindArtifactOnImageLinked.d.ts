import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { Goal } from "../../../../common/delivery/goals/Goal";
import { ArtifactListenerRegisterable } from "../../../../common/listener/ArtifactListener";
import { ProjectLoader } from "../../../../common/repo/ProjectLoader";
import { ArtifactStore } from "../../../../spi/artifact/ArtifactStore";
import { OnImageLinked } from "../../../../typings/types";
import { CredentialsResolver } from "../../../common/CredentialsResolver";
export declare class FindArtifactOnImageLinked implements HandleEvent<OnImageLinked.Subscription> {
    goal: Goal;
    private readonly artifactStore;
    private readonly registrations;
    private readonly projectLoader;
    private readonly credentialsResolver;
    /**
     * The goal to update when an artifact is linked.
     * When an artifact is linked to a commit, the build must be done.
     */
    constructor(goal: Goal, artifactStore: ArtifactStore, registrations: ArtifactListenerRegisterable[], projectLoader: ProjectLoader, credentialsResolver: CredentialsResolver);
    handle(event: EventFired<OnImageLinked.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
