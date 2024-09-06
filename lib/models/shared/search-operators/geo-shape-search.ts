import { GeoJSON } from '../../core/geo-json';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The geoShape operator supports querying shapes with a relation to a given geometry if indexShapes is set to true in
 * the index definition.
 *
 * When specifying the coordinates to search, longitude must be specified first and then the latitude. Longitude values
 * can be between -180 and 180, both inclusive. Latitude values can be between -90 and 90, both inclusive. Coordinate
 * values can be integers or doubles.
 *
 * Note
 * Atlas Search does not support the following:
 *
 * Non-default coordinate reference system (CRS)
 *
 * Planar XY coordinate system (2 dimensional)
 *
 * Coordinate pairs Point notation (that is, pointFieldName: [12, 34])
 */
export type GeoShapeSearch = {
  geoShape: {
    /**
     *
     * GeoJSON object that specifies the Polygon, MultiPolygon, or LineString shape or point to search. The polygon
     * must be specified as a closed loop where the last position is the same as the first position.
     *
     * When calculating geospatial results, Atlas Search geoShape and geoWithin operators and MongoDB $geoIntersects
     * operator use different geometries. This difference can be seen in how Atlas Search and MongoDB draw polygonal
     * edges.
     *
     * Atlas Search draws polygons based on Cartesian distance, which is the shortest line between two points in the
     * coordinate reference system.
     *
     * MongoDB draws polygons using third-party library for geodesic types that use geodesic lines. To learn more, see
     * GeoJSON Objects.
     *
     * Atlas Search and MongoDB could return different results for geospatial queries involving polygons.
     */
    geometry: GeoJSON;
    /**
     * Indexed geo type field or fields to search. See Path Construction for more information.
     */
    path: string;
    /**
     * Relation of the query shape geometry to the indexed field geometry. Value can be one of the following:
     *
     * contains - Indicates that the indexed geometry contains the query geometry.
     *
     * disjoint - Indicates that both the query and indexed geometries have nothing in common.
     *
     * intersects - Indicates that both the query and indexed geometries intersect.
     *
     * within - Indicates that the indexed geometry is within the query geometry. You can't use within with LineString
     * or Point.
     */
    relation: 'contains' | 'disjoint' | 'intersects' | 'within';
    /**
     * Score to assign to matching search results. By default, the score in the results is 1. You can modify the score
     * using the following options:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score with the given expression.
     *
     * For information on using score in your query, see Score the Documents in the Results.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};