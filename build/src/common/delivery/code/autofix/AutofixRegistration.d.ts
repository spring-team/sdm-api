import { AnyProjectEditor, EditResult } from "@atomist/automation-client/operations/edit/projectEditor";
import { PushTest } from "../../../listener/PushTest";
import { PushReactionRegistration, SelectiveCodeActionOptions } from "../PushReactionRegistration";
export interface AutofixRegistrationOptions extends SelectiveCodeActionOptions {
    ignoreFailure: boolean;
}
export interface AutofixRegistration extends PushReactionRegistration<EditResult> {
    options?: AutofixRegistrationOptions;
}
/**
 * Create an autofix from an existing editor. An editor for autofix
 * should not rely on parameters being passed in. An existing editor can be wrapped
 * to use predefined parameters.
 * Any use of MessageClient.respond in an editor used in an autofix will be redirected to
 * linked channels as autofixes are normally invoked in an EventHandler and EventHandlers
 * do not support respond. Be sure to set parameters if they are required by your editor.
 */
export declare function editorAutofixRegistration(use: {
    name: string;
    editor: AnyProjectEditor;
    pushTest?: PushTest;
    options?: AutofixRegistrationOptions;
    parameters?: any;
}): AutofixRegistration;
