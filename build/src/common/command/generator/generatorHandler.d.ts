/**
 * Create a generator function wrapping the given transform
 * @param {AnyProjectEditor} editorFactory editor for the transformation
 * @param factory construction function
 * @param {string} name name of the generator
 * @param {string} details object allowing customization beyond reasonable defaults
 * @return {HandleCommand}
 */
import { HandleCommand } from "@atomist/automation-client";
import { EditorFactory, GeneratorCommandDetails } from "@atomist/automation-client/operations/generate/generatorToCommand";
import { SeedDrivenGeneratorParameters } from "@atomist/automation-client/operations/generate/SeedDrivenGeneratorParameters";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
/**
 * Create a command handler for project generation
 * @param {EditorFactory<P extends SeedDrivenGeneratorParameters>} editorFactory to create editor to perform transformation
 * @param {Maker<P extends SeedDrivenGeneratorParameters>} factory
 * @param {string} name
 * @param {Partial<GeneratorCommandDetails<P extends SeedDrivenGeneratorParameters>>} details
 * @return {HandleCommand}
 */
export declare function generatorHandler<P extends SeedDrivenGeneratorParameters>(editorFactory: EditorFactory<P>, factory: Maker<P>, name: string, details?: Partial<GeneratorCommandDetails<P>>): HandleCommand;
