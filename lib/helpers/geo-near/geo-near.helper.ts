import { GeoNearStage } from '../../models';

/**
 * Near Payload
 * @param near The point for which to find the closest documents.
 * @param distanceField The output field that contains the calculated distance. To specify a field within an embedded
 * document, use dot notation.
 * @param optional Optional.
 * @constructor
 */
export const GeoNearHelper = (near: any, distanceField: string, optional: {
  /**
   * determines how MongoDB calculates the distance between two points
   */
  spherical?: boolean;
  /**
   * The maximum distance from the center point that the documents can be. MongoDB limits the results to those documents
   * that fall within the specified distance from the center point
   */
  maxDistance?: number;
  /**
   * Limits the results to the documents that match the query. The query syntax is the usual MongoDB read operation query
   * syntax
   */
  query?: any;
  /**
   * The factor to multiply all distances returned by the query
   */
  distanceMultiplier?: number;
  /**
   * This specifies the output field that identifies the location used to calculate the distance
   */
  includeLocs?: string;
  /**
   * If this value is true, the query returns a matching document once, even if more than one of the document’s location
   * fields match the query
   */
  uniqueDocs?: boolean;
  /**
   * The minimum distance from the center point that the documents can be
   */
  minDistance?: number;
  /**
   * Specify the geospatial indexed field to use when calculating the distance
   */
  key?: any;
} = {}) => {
  return {
    near,
    distanceField,
    ...optional,
  } as GeoNearStage;
};
