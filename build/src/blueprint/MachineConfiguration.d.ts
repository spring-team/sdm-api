import { Configuration } from "@atomist/automation-client";
import { SoftwareDeliveryMachineOptions } from "./SoftwareDeliveryMachineOptions";
/**
 * Configuration for software delivery machines
 */
export interface MachineConfiguration {
    readonly name: string;
    readonly options: SoftwareDeliveryMachineOptions;
    /**
     * Automation client configuration this machine will run in
     */
    readonly configuration: Configuration;
}
