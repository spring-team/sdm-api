import { Function1 } from "lodash";
import { RepoContext, SdmContext } from "../context/SdmContext";
export declare type ListenerInvocation = SdmContext;
/**
 * Common parameters to an invocation of a listener to one of the
 * SDM's specific events. These are fired by our event handlers to allow
 * multiple, domain specific, listeners to be invoked.
 */
export declare type RepoListenerInvocation = RepoContext;
/**
 * Mapper from a ListenerInvocation to any result
 */
export declare type SdmListener<I extends ListenerInvocation, R extends any = any> = Function1<I, Promise<R>>;
export declare type RepoListener<I extends RepoListenerInvocation = RepoListenerInvocation, R extends any = any> = Function1<I, Promise<R>>;
