import { DensifyStage } from '../../models';
import { DensifyStageOptional } from '../../models/stages/densify-stage';

/**
 * Densify Helper
 * @param field The field to densify. The values of the specified field must either be all numeric values or all dates.
 * @param range An object that specifies how the data is densified.
 * @param optional Optionals.
 * @constructor
 */
export const DensifyHelper = (
  field: DensifyStage['field'],
  range: DensifyStage['range'],
  optional: DensifyStageOptional = {},
) => {
  return {
    field,
    range,
    ...optional,
  } as DensifyStage;
};
