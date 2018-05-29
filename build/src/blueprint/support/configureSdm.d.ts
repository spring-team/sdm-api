import { Configuration } from "@atomist/automation-client";
import { SoftwareDeliveryMachine } from "../SoftwareDeliveryMachine";
import { SoftwareDeliveryMachineOptions } from "../SoftwareDeliveryMachineOptions";
export interface ConfigureOptions {
    sdmOptions?: Partial<SoftwareDeliveryMachineOptions>;
    requiredConfigurationValues?: string[];
}
export declare function configureSdm(machineMaker: (options: SoftwareDeliveryMachineOptions, configuration: Configuration) => SoftwareDeliveryMachine, options?: ConfigureOptions): (config: Configuration) => Promise<Configuration>;
