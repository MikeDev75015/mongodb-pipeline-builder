import {ProjectStageInterface} from "./project-stage.interface";

export interface LookupConditionPayloadInterface {
    from: string;
    sourceList?: string[];
    project?: ProjectStageInterface;
    pipeline?: any[];
    as: string
}
