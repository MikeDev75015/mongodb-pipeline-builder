import { BucketAutoStage } from '../../models';
import { BucketAutoStageOptional } from '../../models/stages/bucket-auto-stage';

/**
 * BucketAuto Helper
 * @param groupBy An expression to group documents by. To specify a field path, prefix the field name with a dollar
 *   sign
 * $ and enclose it in quotes.
 * @param buckets A positive 32-bit integer that specifies the number of buckets into which input documents are
 *   grouped.
 * @param optional Optionals.
 * @constructor
 */
export const BucketAutoHelper = (
  groupBy: BucketAutoStage['groupBy'],
  buckets: BucketAutoStage['buckets'],
  optional: BucketAutoStageOptional = {},
) => {
  return {
    groupBy,
    buckets,
    ...optional,
  } as BucketAutoStage;
};
