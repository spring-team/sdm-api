export declare const SdmVersionRootType = "SdmVersion";
export interface SdmVersion {
    sha: string;
    branch: string;
    repo: {
        name: string;
        owner: string;
        providerId: string;
    };
    version: string;
}
