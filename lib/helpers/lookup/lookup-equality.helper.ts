import { PipelineError } from '../../errors';
import { LookupEquality } from '../../models';

/**
 * Equality Match
 * To perform an equality match between a field from the input documents with a field from the documents of the “joined”
 * collection
 *
 * @param from
 * @param as
 * @param localField
 * @param foreignField
 */
export const LookupEqualityHelper = (from: string, as: string, localField: string, foreignField: string) => {
  if (!localField || !foreignField) {
    throw new PipelineError(
      'Invalid Lookup Equality Payload, invalid or missing "localField" or "foreignField" parameter!');
  }

  return {
    from,
    localField,
    foreignField,
    as,
  } as LookupEquality;
};
