import { AnyProjectEditor, ProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
import { ProgressLog } from "../../../spi/log/ProgressLog";
import { SpawnCommand } from "../../../util/misc/spawned";
/**
 * Decorate an editor factory to make editors it creates chatty, so they respond to
 * Slack if there's nothing for them to do
 * @param editorName name of the editor
 * @param {(params: PARAMS) => AnyProjectEditor} f
 * @return {(params: PARAMS) => AnyProjectEditor}
 */
export declare function chattyEditorFactory<PARAMS>(editorName: string, f: (params: PARAMS) => AnyProjectEditor): (params: PARAMS) => ProjectEditor;
/**
 * Wrap this editor to make it chatty, so it responds to
 * Slack if there's nothing to do
 * @param editorName name of the editor
 * @param {AnyProjectEditor} underlyingEditor
 * @return {(project: GitProject, context, parms) => Promise<any | EditResult>}
 */
export declare function chattyEditor(editorName: string, underlyingEditor: AnyProjectEditor): ProjectEditor;
/**
 * Create a project editor wrapping spawned local commands
 * run on the project. For example, allows use of tslint as an editor.
 * @param {SpawnCommand[]} commands to execute
 * @param log progress log (optional, stream to console if not passed in)
 * @return {ProjectEditor}
 */
export declare function localCommandsEditor(commands: SpawnCommand[], log?: ProgressLog): ProjectEditor;
