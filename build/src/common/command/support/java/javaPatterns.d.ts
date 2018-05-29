import { BaseParameter } from "@atomist/automation-client/internal/metadata/decoratorSupport";
/**
 * Validation pattern for Java identifiers
 * @type {{description: string; pattern: RegExp; validInput: string; minLength: number; maxLength: number}}
 */
export declare const JavaIdentifierRegExp: Partial<BaseParameter>;
export declare const JavaPackageRegExp: Partial<BaseParameter>;
export declare const MavenArtifactIdRegExp: Partial<BaseParameter>;
export declare const MavenGroupIdRegExp: Partial<BaseParameter>;
