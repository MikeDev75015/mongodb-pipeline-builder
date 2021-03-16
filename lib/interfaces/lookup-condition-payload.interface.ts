import {ProjectStageInterface,StageInterface} from "./";

/**
 * interface LookupConditionPayloadInterface
 */
export interface LookupConditionPayloadInterface {
    /**
     * from
     */
    from: string;
    /**
     * sourceList
     */
    sourceList?: string[];
    /**
     * project
     */
    project?: ProjectStageInterface;
    /**
     * pipeline
     */
    pipeline?: StageInterface[];
    /**
     * as
     */
    as: string
}
