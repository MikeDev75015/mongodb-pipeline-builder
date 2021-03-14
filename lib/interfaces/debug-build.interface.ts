import {StageInterface} from "./";

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
    historyList: {
        date: string;
        action: string;
        value?: any;
        pipeline?: StageInterface[];
    }[]
}
