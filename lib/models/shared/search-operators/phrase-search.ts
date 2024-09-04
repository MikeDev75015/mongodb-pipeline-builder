import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The phrase operator performs search for documents containing an ordered sequence of terms using the analyzer
 * specified in the index configuration. If no analyzer is specified, the default standard analyzer is used.
 */
export type PhraseSearch = {
  phrase: {
    /**
     * String or strings to search for.
     */
    query: MayBeArray<string>;
    /**
     * Indexed field or fields to search. You can also specify a wildcard path to search. See path construction.
     */
    path: MayBeArray<string>;
    /**
     * Allowable distance between words in the query phrase. Lower value allows less positional distance between the
     * words and greater value allows more reorganization of the words and more distance between the words to satisfy
     * the query. The default is 0, meaning that words must be exactly in the same position as the query in order to
     * be considered a match. Exact matches are scored higher.
     */
    slop?: number;
    /**
     * Score to assign to matching search results. You can modify the default score using the following options:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score with the given expression.
     *
     * For information on the options for modifying the default score, see Score the Documents in the Results.
     *
     * Note
     * When you query values in arrays, Atlas Search doesn't alter the score of the matching results based on the
     * number of values inside the array that matched the query. The score would be the same as a single match
     * regardless of the number of matches inside an array.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
