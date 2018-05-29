import { WrapOptions } from "retry";
import { EndpointVerificationListener } from "../../handlers/events/delivery/verify/executeVerifyEndpoint";
/**
 * Make an HTTP request to the reported endpoint to check
 */
export declare function lookFor200OnEndpointRootGet(retryOpts?: Partial<WrapOptions>): EndpointVerificationListener;
