import { GeoNearStage } from '../../models';
import { GeoNearStageOptional } from '../../models/stages/geo-near-stage';

/**
 * Near Payload
 * @param near The point for which to find the closest documents.
 * @param distanceField The output field that contains the calculated distance. To specify a field within an embedded
 * document, use dot notation.
 * @param optional Optionals.
 * @constructor
 */
export const GeoNearHelper = (
  near: GeoNearStage['near'],
  distanceField: GeoNearStage['distanceField'],
  optional: GeoNearStageOptional = {},
) => (
  {
    near,
    distanceField,
    ...optional,
  } as GeoNearStage
);
