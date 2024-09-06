import { GeoJSONPoint } from '../../core/geo-json';
import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The near operator supports querying and scoring numeric, date, and GeoJSON point values. This operator can be used
 * to perform a search over:
 *
 * Number fields of BSON int32, int64, and double data types.
 *
 * Date fields of BSON date type in ISODate format.
 *
 * Geographic location fields defined using latitude and longitude coordinates.
 *
 * You can use the near operator to find results that are near a number or a date. The near operator scores the Atlas
 * Search results by proximity to the number or date.
 */
export type NearSearch = {
  near: {
    /**
     * Number, date, or geographic point to search near. This is the origin from which the proximity of the results
     * is measured.
     *
     * For number fields, the value must be of BSON int32, int64, or double data types.
     *
     * For date fields, the value must be an ISODate formatted date.
     *
     * For geo fields. the value must be a GeoJSON point.
     */
    origin: Date | number | GeoJSONPoint;
    /**
     * Indexed field or fields to search. See Path Construction.
     */
    path: MayBeArray<string>;
    /**
     * Value to use to calculate scores of Atlas Search result documents. Score is calculated using the following
     * formula:
     *
     *               pivot
     * score = ------------------
     *          pivot + distance
     * where distance is the difference between origin and the indexed field value.
     *
     * Results have a score equal to 1/2 (or 0.5) when their indexed field value is pivot units away from origin. The
     * value of pivot must be greater than (i.e. >) 0.
     *
     * If origin is a:
     *
     * Number, pivot can be specified as an integer or floating point number.
     *
     * Date, pivot must be specified in milliseconds and can be specified as a 32 or 64 bit integer.
     *
     * Example
     * 1 minute is equal to 60,000 ms
     *
     * 1 hour is equal to 3,600,000 ms
     *
     * 1 day is equal to 86,400,000 ms
     *
     * 1 month (or 30 days) is equal to 2,592,000,000 ms
     *
     * GeoJSON point, pivot is measured in meters and must be specified as an integer or floating point number.
     */
    pivot: number;
    /**
     * Score to assign to matching search results. You can modify the default score using the following options:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score with the given expression.
     *
     * For information on using score in your query, see Score the Documents in the Results.
     *
     * To learn more, see Scoring Behavior.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
