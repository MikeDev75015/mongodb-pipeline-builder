import { BucketStage } from '../../models';
import { BucketStageOptional } from '../../models/stages/bucket-stage';

/**
 * Bucket Helper
 * @param groupBy An expression to group documents by. To specify a field path, prefix the field name with a dollar
 *   sign
 * $ and enclose it in quotes.
 * Unless $bucket includes a default specification, each input document must resolve the groupBy field path or
 * expression to a value that falls within one of the ranges specified by the boundaries.
 * @param boundaries An array of values based on the groupBy expression that specify the boundaries for each bucket.
 * Each adjacent pair of values acts as the inclusive lower boundary and the exclusive upper boundary for the bucket.
 * You must specify at least two boundaries. *
 * The specified values must be in ascending order and all of the same type. The exception is if the values are of
 *   mixed
 * numeric types, such as: *
 * [ 10, NumberLong(20), NumberInt(30) ] *
 * EXAMPLE *
 * An array of [ 0, 5, 10 ] creates two buckets: *
 * [0, 5) with inclusive lower bound 0 and exclusive upper bound 5. *
 * [5, 10) with inclusive lower bound 5 and exclusive upper bound 10.
 * @param optional Optionals.
 * @constructor
 */
export const BucketHelper = (
  groupBy: BucketStage['groupBy'],
  boundaries: BucketStage['boundaries'],
  optional: BucketStageOptional = {},
) => {
  return {
    groupBy,
    boundaries,
    ...optional,
  } as BucketStage;
};
