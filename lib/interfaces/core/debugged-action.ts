import {PipeLineStage} from "./pipeline-stage";

/**
 * Interface representing a save of a builder action
 */
export interface DebuggedAction {
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
    pipeline?: PipeLineStage[];
}
