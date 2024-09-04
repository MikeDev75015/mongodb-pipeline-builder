import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The equals operator checks whether a field matches a value you specify. equals supports querying the following data
 * types:
 *
 * boolean
 *
 * objectId
 *
 * number, including int32, int64, and double
 *
 * date
 *
 * string, indexed as Atlas Search token type
 *
 * uuid
 *
 * null
 *
 * You can use the equals operator to query booleans, objectIds, numbers, dates, and strings (indexed as token type) in
 * arrays. If at least one element in the array matches the "value" field in the equals operator, Atlas Search adds the
 * document to the result set.
 *
 * Note
 * The equals operator supports numbers up to 15 decimal digits. Additional decimal digits in documents or queries can
 * cause precision issues or query inaccuracy.
 */
export type EqualsSearch = {
  equals: {
    /**
     * Indexed field to search.
     */
    path: string;
    /**
     * Value to query for.
     */
    value: boolean | object | number | Date | string | null;
    /**
     * Score to assign to matching search term results. Use one of the following options to modify the score:
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
