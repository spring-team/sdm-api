import { ProjectIdentifier } from "../projectIdentifier";
import { VersionedArtifact } from "./VersionedArtifact";
export declare const MavenProjectIdentifier: ProjectIdentifier;
/**
 * Return version info from the POM using xml2j XML parser
 * @param {string} pom
 * @return {Promise<VersionedArtifact>}
 */
export declare function identification(pom: string): Promise<VersionedArtifact>;
