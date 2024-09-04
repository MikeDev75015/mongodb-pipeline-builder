import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The in operator performs a search for an array of BSON number, date, boolean, objectId, uuid, or string values at
 * the given path and returns documents where the value of the field equals any value in the specified array. If the
 * field holds an array, then the in operator selects the documents whose field holds an array that contains at least
 * one element that matches any value in the specified array.
 */
export type InSearch = {
  in: {
    /**
     * Indexed field to search. You can also specify a wildcard path to search. See path construction for more
     * information.
     *
     * Note
     * To search string values in a field, you must index the field as the Atlas Search token type.
     */
    path: string;
    /**
     * Value or values to search. Value can be either a single value or an array of values of only one of the supported
     * BSON types and can't be a mix of different types.
     *
     * Note
     * To search for string values in a field, you must index the field as the Atlas Search token type.
     */
    value: boolean | object | number | Date | string;
    /**
     * Score to assign to matching search term results. Use one of the following options to modify the score:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score using the function expression.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
