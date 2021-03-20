import {DebugHistoryInterface} from "./debug-history.interface";

/**
 * Interface representing the complete debug object
 */
export interface DebugBuildInterface {
    /**
     * status
     */
    status: boolean;
    /**
     * historyList
     */
    historyList: DebugHistoryInterface[]
}
