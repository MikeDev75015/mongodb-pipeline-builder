import {StageInterface} from "../core/stage.interface";

/**
 * Facet Stage Interface
 */
export interface FacetStageInterface {
    /**
     * Specify the output field name for each specified pipeline.
     */
    [key: string]: StageInterface[]
}
