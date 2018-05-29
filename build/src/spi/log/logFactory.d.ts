import { ProgressLogFactory } from "./ProgressLog";
/**
 * Create a progress log that will use Rolar logging service if available,
 * otherwise falling back to logging.
 * @param {string} rolarBaseUrl
 * @param {string} dashboardBaseUrl
 * @return {ProgressLogFactory}
 */
export declare function logFactory(rolarBaseUrl?: string, dashboardBaseUrl?: string): ProgressLogFactory;
