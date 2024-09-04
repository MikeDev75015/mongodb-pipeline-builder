import { ChangeStreamStage } from '../../models';

/**
 * Returns a Change Stream cursor on a collection, a database, or an entire cluster. Must be used as the first stage in
 * an aggregation pipeline.
 *
 * @param optional Optionals.
 * @constructor
 */
export const ChangeStreamHelper = (
  optional: ChangeStreamStage = {},
) => {
  return optional;
};
