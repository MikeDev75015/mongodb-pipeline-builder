/**
 * GeoNear Stage Interface
 */
export type GeoNearStage = {
    /**
     * The point for which to find the closest documents.
     * If using a 2dsphere index, you can specify the point as either a GeoJSON point or legacy coordinate pair.
     *
     * If using a 2d index, specify the point as a legacy coordinate pair.
     */
    near: any;
    /**
     * The output field that contains the calculated distance. To specify a field within an embedded document, use dot
     * notation.
     */
    distanceField: string;
    /**
     * Optional. Determines how MongoDB calculates the distance between two points:
     *
     * When true, MongoDB uses $nearSphere semantics and calculates distances using spherical geometry.
     * When false, MongoDB uses $near semantics: spherical geometry for 2dsphere indexes and planar geometry for 2d
     * indexes.
     *
     * Default: false.
     */
    spherical?: boolean;
    /**
     * Optional. The maximum distance from the center point that the documents can be. MongoDB limits the results to
     * those documents that fall within the specified distance from the center point.
     *
     * Specify the distance in meters if the specified point is GeoJSON and in radians if the specified point is legacy
     * coordinate pairs.
     */
    maxDistance?: number;
    /**
     * Optional. Limits the results to the documents that match the query. The query syntax is the usual MongoDB read
     * operation query syntax.
     *
     * You cannot specify a $near predicate in the query field of the $geoNear stage.
     */
    query?: any;
    /**
     * Optional. The factor to multiply all distances returned by the query. For example, use the distanceMultiplier to
     * convert radians, as returned by a spherical query, to kilometers by multiplying by the radius of the Earth.
     */
    distanceMultiplier?: number;
    /**
     * Optional. This specifies the output field that identifies the location used to calculate the distance. This
     * option is useful when a location field contains multiple locations. To specify a field within an embedded
     * document, use dot notation.
     */
    includeLocs?: string;
    /**
     * Optional. If this value is true, the query returns a matching document once, even if more than one of the
     * document’s location fields match the query.
     * Deprecated since version 2.6: Geospatial queries no longer return duplicate results. The $uniqueDocs operator
     * has no impact on results.
     */
    uniqueDocs?: boolean;
    /**
     * Optional. The minimum distance from the center point that the documents can be. MongoDB limits the results to
     * those documents that fall outside the specified distance from the center point.
     * Specify the distance in meters for GeoJSON data and in radians for legacy coordinate pairs.
     */
    minDistance?: number;
    /**
     * Optional. Specify the geospatial indexed field to use when calculating the distance.
     *
     * If your collection has multiple 2d and/or multiple 2dsphere indexes, you must use the key option to specify the
     * indexed field path to use. Specify Which Geospatial Index to Use provides a full example.
     * If there is more than one 2d index or more than one 2dsphere index and you do not specify a key, MongoDB will
     * return an error.
     *
     * If you do not specify the key, and you have at most only one 2d index and/or only one 2dsphere index, MongoDB
     * looks first for a 2d index to use. If a 2d index does not exists, then MongoDB looks for a 2dsphere index to use.
     */
    key?: any;
};
