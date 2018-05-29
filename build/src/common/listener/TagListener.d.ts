import { OnTag } from "../../typings/types";
import { RepoListenerInvocation, SdmListener } from "./Listener";
import Tag = OnTag.Tag;
/**
 * Invocation when a tag has been created on a repo
 */
export interface TagListenerInvocation extends RepoListenerInvocation {
    tag: Tag;
}
export declare type TagListener = SdmListener<TagListenerInvocation>;
