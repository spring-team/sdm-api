import { ArtifactStore } from "../../../../../spi/artifact/ArtifactStore";
import { ProjectLoader } from "../../../../repo/ProjectLoader";
import { SpawnBuilder } from "../SpawnBuilder";
export declare const AtomistBuildFile = ".atomist/build.sh";
export declare function npmCustomBuilder(artifactStore: ArtifactStore, projectLoader: ProjectLoader): SpawnBuilder;
