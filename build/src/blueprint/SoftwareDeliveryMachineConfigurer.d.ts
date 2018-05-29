import { SoftwareDeliveryMachine } from "./SoftwareDeliveryMachine";
/**
 * Configuration function that can added in SoftwareDeliveryMachine.addCapabilities.
 * Facilitates modularity at a higher level than FunctionUnit or handlers.
 * For example, a Node module can export a configurer.
 */
export interface SoftwareDeliveryMachineConfigurer {
    /**
     * Name of this configurer
     */
    name: string;
    /**
     * Function to configure the given SDM
     * @param sdm
     */
    configure(sdm: SoftwareDeliveryMachine): void;
}
