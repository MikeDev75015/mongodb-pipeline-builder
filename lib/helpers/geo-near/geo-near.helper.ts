import {GeoNearStage} from "../../interfaces";

/**
 * Near Payload
 * @param near The point for which to find the closest documents.
 * @param distanceField The output field that contains the calculated distance. To specify a field within an embedded
 * document, use dot notation.
 * @param optional
 * [spherical] - determines how MongoDB calculates the distance between two points,
 * [maxDistance] - The maximum distance from the center point that the documents can be. MongoDB limits the results to
 * those documents that fall within the specified distance from the center point,
 * [query] - Limits the results to the documents that match the query. The query syntax is the usual MongoDB read
 * operation query syntax.
 * [distanceMultiplier] - The factor to multiply all distances returned by the query,
 * [includeLocs] - This specifies the output field that identifies the location used to calculate the distance,
 * [uniqueDocs] - If this value is true, the query returns a matching document once, even if more than one of the
 * document’s location fields match the query,
 * [minDistance] - The minimum distance from the center point that the documents can be,
 * [key] - Specify the geospatial indexed field to use when calculating the distance.
 * @constructor
 */
export const GeoNearHelper = (near: any, distanceField: string, optional?: {
    spherical?: boolean;
    maxDistance?: number;
    query?: any;
    distanceMultiplier?: number;
    includeLocs?: string;
    uniqueDocs?: boolean;
    minDistance?: number;
    key?: any;
}) => {
    let payload: GeoNearStage = {
        near,
        distanceField
    };

    if (optional) {
        payload = {
            ...payload,
            ...optional
        };
    }

    return payload;
}
