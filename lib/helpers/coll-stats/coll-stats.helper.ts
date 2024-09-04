import { CollStatsStage } from '../../models';

/**
 * Returns statistics regarding a collection or view.
 *
 * @param optional Optionals.
 * @constructor
 */
export const CollStatsHelper = (
  optional: CollStatsStage = {},
) => {
  return {
    ...optional,
    ...(optional.queryExecStats !== undefined ? { queryExecStats: {} } : {}),
  } as CollStatsStage;
};
