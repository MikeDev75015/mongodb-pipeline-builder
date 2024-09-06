import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

type CompareType = Date | number | string | object;

/**
 * The range operator supports querying and scoring numeric, date, and string values. You can use this operator to find results that are within a given numeric, date, objectId, or letter (from the English alphabet) range.
 *
 * range supports querying the following data types:
 *
 * number, including int32, int64, and double
 *
 * date
 *
 * string, indexed as Atlas Search token type
 *
 * objectId
 */
export type RangeSearch = {
  range: {
    /**
     * Find values greater than (>) or greater than or equal to (>=) the given value.
     *
     * For number fields, the value can be an int32, int64, or double data type.
     *
     * For date fields, the value must be an ISODate formatted date.
     *
     * For string fields, the value must be indexed as Atlas Search token type.
     *
     * For ObjectId fields, the value must be indexed as objectId data type or dynamic mappings must be set to true.
     */
    gte?: CompareType;
    /**
     * Find values greater than (>) or greater than or equal to (>=) the given value.
     *
     * For number fields, the value can be an int32, int64, or double data type.
     *
     * For date fields, the value must be an ISODate formatted date.
     *
     * For string fields, the value must be indexed as Atlas Search token type.
     *
     * For ObjectId fields, the value must be indexed as objectId data type or dynamic mappings must be set to true.
     */
    gt?: CompareType;
    /**
     * Find values less than (<) or less than or equal to (<=) the given value.
     *
     * For number fields, the value can be an int32, int64, or double data type.
     *
     * For date fields, the value must be an ISODate formatted date.
     *
     * For string fields, the value must be indexed as Atlas Search token type.
     *
     * For ObjectId fields, the value must be indexed as objectId data type or dynamic mappings must be set to true.
     */
    lte?: CompareType;
    /**
     * Find values less than (<) or less than or equal to (<=) the given value.
     *
     * For number fields, the value can be an int32, int64, or double data type.
     *
     * For date fields, the value must be an ISODate formatted date.
     *
     * For string fields, the value must be indexed as Atlas Search token type.
     *
     * For ObjectId fields, the value must be indexed as objectId data type or dynamic mappings must be set to true.
     */
    lt?: CompareType;
    /**
     * Indexed field or fields to search. See Path Construction.
     */
    path: string;
    /**
     * Modify the score assigned to matching search results. You can modify the default score using the following
     * options:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score with the given expression.
     *
     * For information on using score in your query, see Score the Documents in the Results.
     *
     * Note
     * When you query values in arrays, Atlas Search doesn't alter the score of the matching results based on the
     * number of values inside the array that matched the query. The score would be the same as a single match
     * regardless of the number of matches inside an array.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
