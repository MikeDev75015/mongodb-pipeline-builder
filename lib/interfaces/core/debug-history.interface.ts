import {StageInterface} from "./stage.interface";

/**
 * Interface representing a save of a builder action
 */
export interface DebugHistoryInterface {
    /**
     * The current date of the action
     */
    date: string;
    /**
     * The name of the action
     */
    action: string;
    /**
     * The last values received
     */
    value?: any;
    /**
     * The last state of the pipeline when the action was recorded
     */
    pipeline?: StageInterface[];
}
