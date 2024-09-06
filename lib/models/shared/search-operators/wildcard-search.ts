import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The wildcard operator enables queries which use special characters in the search string that can match any character.
 *
 * Character
 * Description
 * ?
 * Matches any single character.
 * *
 * Matches 0 or more characters.
 * \
 * Escape character.
 * wildcard is a term-level operator, meaning that the query field is not analyzed. Term-level operators work well with
 * the Keyword Analyzer, because the query field is treated as a single term, with special characters included. For an
 * example of querying against an analyzed query field vs. a non-analyzed query field, see the analyzed field example.
 */
export type WildcardSearch = {
  wildcard: {
    /**
     * String or strings to search for.
     */
    query: MayBeArray<string>;
    /**
     * Indexed field or fields to search. You can also specify a wildcard path to search. See path construction for
     * more information.
     */
    path: MayBeArray<string>;
    /**
     * Must be set to true if the query is run against an analyzed field.
     */
    allowAnalyzedField?: boolean;
    /**
     * Modify the score assigned to matching search term results. Options are:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score using the given expression.
     *
     * For information on using score in your query, see Score the Documents in the Results.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
