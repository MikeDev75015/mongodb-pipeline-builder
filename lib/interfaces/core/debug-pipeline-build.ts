import {DebuggedAction} from "./debugged-action";

/**
 * Interface representing the complete debug object
 */
export interface DebugPipelineBuild {
    /**
     * status
     */
    status: boolean;
    /**
     * historyList
     */
    actionList: DebuggedAction[]
}
