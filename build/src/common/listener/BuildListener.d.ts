import { OnBuildComplete } from "../../typings/types";
import { RepoListenerInvocation, SdmListener } from "./Listener";
import Build = OnBuildComplete.Build;
/**
 * Invocation for a build on a project. Not a part of delivery control:
 * Purely for observational purposes, such as determining the time
 * a build took.
 */
export interface BuildListenerInvocation extends RepoListenerInvocation {
    /**
     * Build that has just completed.
     */
    build: Build;
}
export declare type BuildListener = SdmListener<BuildListenerInvocation>;
