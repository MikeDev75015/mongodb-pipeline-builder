import {StageInterface} from "./";

export interface DebugBuildInterface {
    status: boolean;
    historyList: {
        date: string;
        action: string;
        value?: any;
        stageAdded?: StageInterface;
        pipeline?: StageInterface[];
    }[]
}
