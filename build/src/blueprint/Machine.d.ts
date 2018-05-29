import { Configuration } from "@atomist/automation-client";
import { SoftwareDeliveryMachineOptions } from "./SoftwareDeliveryMachineOptions";
/**
 * Configuration for machine
 */
export interface Machine {
    readonly name: string;
    readonly options: SoftwareDeliveryMachineOptions;
    /**
     * Automation client configuration this machine will run in
     */
    readonly configuration: Configuration;
}
