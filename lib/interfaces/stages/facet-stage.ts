import {PipeLineStage} from "../core/pipeline-stage";

/**
 * Facet Stage Interface
 */
export interface FacetStage {
    /**
     * Specify the output field name for each specified pipeline.
     */
    [key: string]: PipeLineStage[]
}
