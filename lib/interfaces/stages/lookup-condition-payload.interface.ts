import {StageInterface} from "../index";

/**
 * interface LookupConditionPayloadInterface
 */
export interface LookupConditionPayloadInterface {
    /**
     * from
     */
    from: string;
    /**
     * let
     */
    let?: { [index: string]: string };
    /**
     * project
     */
    project?: { [index: string]: any };
    /**
     * pipeline
     */
    pipeline?: StageInterface[];
    /**
     * as
     */
    as: string
}

