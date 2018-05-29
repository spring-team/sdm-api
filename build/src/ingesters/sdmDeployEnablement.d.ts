export declare const DeployEnablementRootType = "SdmDeployEnablement";
export interface SdmDeployEnablement {
    state: "requested" | "disabled";
    owner: string;
    repo: string;
    providerId: string;
}
