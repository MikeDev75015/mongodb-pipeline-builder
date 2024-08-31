import { PipelineStage } from '../core/pipeline-stage';

/**
 * Facet Stage Interface
 */
export type FacetStage = {
  /**
   * Specify the output field name for each specified pipeline.
   */
  [key: string]: PipelineStage[]
};
