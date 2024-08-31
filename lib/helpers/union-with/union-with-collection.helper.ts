import { PipelineStage, UnionWithStage } from '../../models';

/**
 * Collection Payload
 * @param collectionName The collection or view whose pipeline results you wish to include in the result set.
 * @param pipeline Optional. An aggregation pipeline to apply to the specified coll.
 * [ <stage1>, <stage2>, ...]
 * The pipeline cannot include the $out and $merge stages.
 * @constructor
 */
export const UnionWithCollectionHelper = (collectionName: string, pipeline: PipelineStage[] = []) => (
  { coll: collectionName, pipeline }
) as UnionWithStage;
