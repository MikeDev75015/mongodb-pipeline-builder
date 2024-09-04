import { GeoJSON, GeoJSONPoint } from '../../core/geo-json';
import { ScoreOptions } from '../score-options';

type GeoWithinBox = {
  /**
   * Object that specifies the bottom left and top right GeoJSON points of a box to search within. The object takes the
   * following fields:
   *
   * bottomLeft - Bottom left GeoJSON point.
   *
   * topRight - Top right GeoJSON point.
   *
   * To learn how to specify GeoJSON data inside a GeoJSON object, see GeoJSON Objects.
   *
   * Either box, circle, or geometry is required.
   */
  box: {
    bottomLeft: GeoJSONPoint;
    topRight: GeoJSONPoint;
  };
};

type GeoWithinCircle = {
  /**
   * Object that specifies the center point and the radius in meters to search within. The object contains the
   * following GeoJSON fields:
   *
   * center - Center of the circle specified as a GeoJSON point.
   *
   * radius - Radius, which is a number, specified in meters. Value must be greater than or equal to 0.
   *
   * To learn how to specify GeoJSON data inside a GeoJSON object, see GeoJSON Objects.
   *
   * Either circle, box, or geometry is required.
   */
  circle: {
    center: GeoJSONPoint;
    radius: number;
  };
};

type GeoWithinGeometry = {
  /**
   * GeoJSON object that specifies the MultiPolygon or Polygon to search within. The polygon must be specified as a
   * closed loop where the last position is the same as the first position.
   *
   * When calculating geospatial results, Atlas Search geoShape and geoWithin operators and MongoDB $geoIntersects
   * operator use different geometries. This difference can be seen in how Atlas Search and MongoDB draw polygonal edges.
   *
   * Atlas Search draws polygons based on Cartesian distance, which is the shortest line between two points in the
   * coordinate reference system.
   *
   * MongoDB draws polygons using third-party library for geodesic types that use geodesic lines. To learn more, see
   * GeoJSON Objects.
   *
   * Atlas Search and MongoDB could return different results for geospatial queries involving polygons.
   *
   * To learn how to specify GeoJSON data inside a GeoJSON object, see GeoJSON Objects.
   *
   * Either geometry, box, or circle is required.
   */
  geometry: GeoJSON;
};

/**
 * The geoWithin operator supports querying geographic points within a given geometry. Only points are returned, even
 * if indexShapes value is true in the index definition.
 *
 * You can query points within a:
 *
 * Circle
 *
 * Bounding box
 *
 * Polygon
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
export type GeoWithinSearch = {
  geoWithin: {
    /**
     * Indexed geo type field or fields to search. See Path Construction.
     */
    path: string;
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
    score?: ScoreOptions;
  } & (GeoWithinBox | GeoWithinCircle | GeoWithinGeometry);
};
