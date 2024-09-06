import { FillStage } from '../../models';
import { FillStageOptional } from '../../models/stages/fill-stage';

/**
 * Fill Helper
 * @param output Specifies an object containing each field for which to fill missing values. You can specify multiple
 * fields in the output object.
 *
 * The object name is the name of the field to fill. The object value specifies how the field is filled.
 * @param optional Optionals.
 * @constructor
 */
export const FillHelper = (
  output: FillStage['output'],
  optional: FillStageOptional = {},
) => ({
  output,
  ...optional,
} as FillStage);
