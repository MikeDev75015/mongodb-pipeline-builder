import {DebugHistoryInterface} from "./debug-history.interface";

/**
 * interface DebugBuildInterface
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
