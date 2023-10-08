import {PipeLineStage} from "../core/pipeline-stage";

/**
 * UnionWith Stage Interface
 */
export type UnionWithStage = {
    /**
     * The collection or view whose pipeline results you wish to include in the result set.
     */
    coll: string;
    /**
     * Optional. An aggregation pipeline to apply to the specified coll.
     *
     * [ <stage1>, <stage2>, ...]
     *
     * The pipeline cannot include the $out and $merge stages.
     */
    pipeline?: PipeLineStage[];
};
