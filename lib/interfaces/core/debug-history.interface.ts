import {StageInterface} from "./stage.interface";

export interface DebugHistoryInterface {
    date: string;
    action: string;
    value?: any;
    pipeline?: StageInterface[];
}
