import { VersionedArtifact } from "./VersionedArtifact";
export declare function coordinates(va: VersionedArtifact): string;
/**
 * Convert Maven POM XML parser format to our VersionedArtifact
 * @param raw
 * @return {VersionedArtifact}
 */
export declare function toVersionedArtifact(raw: any): VersionedArtifact;
