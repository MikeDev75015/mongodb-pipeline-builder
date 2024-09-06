import { OutStage } from '../../models';
import { OutStageObjectOptional } from '../../models/stages/out-stage';

/**
 * Out Helper
 * @param collection Output collection.
 * @param optional Optionals.
 * @constructor
 */
export const OutHelper = (
  collection: string,
  optional: OutStageObjectOptional = {},
) => (
  optional.db ? { coll: collection, ...optional } : collection
) as OutStage;
