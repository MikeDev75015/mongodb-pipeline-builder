import { LookupCondition, LookupStage, PipelineStage } from '../../models';
import { LookupConditionOptional } from '../../models/stages/lookup-condition';
import { isNotEmptyObject } from '../utils/utils';

/**
 * Join Conditions and Uncorrelated Sub-queries
 * To perform uncorrelated subQueries between two collections as well as allow other join conditions besides a single
 * equality match
 * @param from the collection in the same database to perform the join with. The from collection cannot be sharded.
 * @param as Specifies the name of the new array field to add to the input documents. The new array field contains the
 * matching documents from the from collection.
 * @param optional Optionals.
 */
export const LookupConditionHelper = (
  from: LookupCondition['from'],
  as: LookupCondition['as'],
  optional: LookupConditionOptional = {},
) => {
  const pipeline: PipelineStage[] = [
    ...(optional.pipeline ?? []),
    ...(optional.project ? [{ $project: optional.project }] : []),
  ];

  return {
    from,
    as,
    ...(isNotEmptyObject(optional.let as object) ? { let: optional.let } : {}),
    ...(pipeline.length ? { pipeline } : {}),
  } as LookupStage;
};
