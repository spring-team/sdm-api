import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { RepoListenerInvocation, SdmListener } from "./Listener";
/**
 * Invocation for an event on a project
 */
export interface ProjectListenerInvocation extends RepoListenerInvocation {
    /**
     * The project to which this event relates. It will have been cloned
     * prior to this invocation. Modifications made during listener invocation will
     * not be committed back to the project (although they are acceptable if necessary, for
     * example to run particular commands against the project).
     * As well as working with
     * project files using the Project superinterface, we can use git-related
     * functionality fro the GitProject subinterface: For example to check
     * for previous shas.
     * We can also easily run shell commands against the project using its baseDir.
     */
    project: GitProject;
}
export declare type ProjectListener = SdmListener<ProjectListenerInvocation>;
