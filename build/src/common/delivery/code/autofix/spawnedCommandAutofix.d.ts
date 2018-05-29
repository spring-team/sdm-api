import { SpawnCommand } from "../../../../util/misc/spawned";
import { PushTest } from "../../../listener/PushTest";
import { AutofixRegistration, AutofixRegistrationOptions } from "./AutofixRegistration";
/**
 * Register an autofix based on spawned local shell commands.
 * For example, could wrap a linter
 */
export declare function spawnedCommandAutofix(name: string, pushTest: PushTest, options: AutofixRegistrationOptions, command1: SpawnCommand, ...additionalCommands: SpawnCommand[]): AutofixRegistration;
