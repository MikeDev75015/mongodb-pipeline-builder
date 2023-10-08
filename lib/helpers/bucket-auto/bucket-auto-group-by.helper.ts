import { BucketAutoStage } from '../../models';
import { GranularityValues } from '../../models/stages/bucket-auto-stage';

/**
 * GroupByAuto Payload
 * @param groupBy An expression to group documents by. To specify a field path, prefix the field name with a dollar
 *   sign
 * $ and enclose it in quotes.
 * @param buckets A positive 32-bit integer that specifies the number of buckets into which input documents are
 *   grouped.
 * @param optional
 * OPTIONAL output Optional. A document that specifies the fields to include in the output documents in addition to the
 * _id field. To specify the field to include, you must use accumulator expressions:
 * <outputfield1>: { <accumulator>: <expression1> },
 * The default count field is not included in the output document when output is specified. Explicitly specify the
 *   count
 * expression as part of the output document to include it:
 * output: {
 * <outputfield1>: { <accumulator>: <expression1> },
 * count: { $sum: 1 }
 * }
 * OPTIONAL granularity Optional. A string that specifies the preferred number series to use to ensure that the
 *   calculated boundary edges end on preferred round numbers or their powers of 10. Available only if the all groupBy
 *   values are numeric and none of them are NaN. The suppported values of granularity are: "R5" | "R10" | "R20" |
 *   "R40" | "R80" | "1-2-5" | "E6" | "E12" | "E24" |
 * "E48" | "E96" | "E192" | "POWERSOF2"
 * @constructor
 */
export const BucketAutoGroupByHelper = (
  groupBy: any,
  buckets: number,
  optional?: { output?: any; granularity?: GranularityValues },
) => {
  return {
    groupBy,
    buckets,
    ...(
      optional?.output ? { output: optional.output } : { output: { 'count': { $sum: 1 } } }
    ),
    ...(
      optional?.granularity ? { granularity: optional.granularity } : {}
    ),

  } as BucketAutoStage;
};
