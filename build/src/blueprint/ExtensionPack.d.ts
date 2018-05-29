import { SoftwareDeliveryMachine } from "./SoftwareDeliveryMachine";
/**
 * Implemented to expose a capability that can be added to a
 * software delivery machine in a consistent manner.
 * Facilitates modularity at a higher level than FunctionUnit or handlers.
 * For example, a Node module can export a configurer.
 */
export interface ExtensionPack {
    /**
     * Name of this configurer
     */
    name: string;
    /**
     * Function to addExtensionPack the given SDM
     * @param sdm
     */
    configure(sdm: SoftwareDeliveryMachine): void;
}
