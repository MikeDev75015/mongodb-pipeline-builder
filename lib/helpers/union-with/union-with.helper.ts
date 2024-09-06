import { PipelineError } from '../../errors';
import { PipelineStage, UnionWithStage } from '../../models';

/**
 * UnionWith Helper
 *
 * @constructor
 * @param coll The collection or view whose pipeline results you wish to include in the result set.
 *
 * If you omit the coll field, you must specify a pipeline field with a first stage of $documents.
 *
 * Required if pipeline is omitted. Otherwise optional.
 * @param pipeline An aggregation pipeline to apply to the input documents.
 *
 * If you specify coll, the pipeline applies to the documents in coll.
 *
 * If you omit coll, the pipeline applies to the documents in the pipeline's $documents stage. For an example, see
 * Create a Union with Specified Documents.
 *
 * The pipeline cannot include the $out and $merge stages. Starting in v6.0, the pipeline can contain the Atlas Search
 * $search stage as the first stage inside the pipeline. To learn more, see Atlas Search Support.
 *
 * Required if coll is omitted. Otherwise optional.
 */
export const UnionWithHelper = (coll: string | undefined, pipeline?: PipelineStage[]): UnionWithStage => {
  if (coll && pipeline) {
    return { coll, pipeline };
  }

  if (coll) {
    return { coll };
  }

  if (pipeline) {
    return { pipeline };
  }

  throw new PipelineError('UnionWithHelper: you must specify either coll or pipeline');
};
