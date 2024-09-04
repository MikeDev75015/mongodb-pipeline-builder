import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * regex interprets the query field as a regular expression. regex is a term-level operator, meaning that the query
 * field isn't analyzed.
 *
 * Tip
 * See also:
 * Analyzers.
 *
 * Analyzed field example.
 *
 * Note
 * The regular expression language available to the regex operator is a limited subset of the PCRE library.
 *
 * For detailed information, see the Class RegExp documentation.
 */
export type RegexSearch = {
  regex: {
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
     * Score to assign to matching search term results. Options are:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score with the given expression.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
