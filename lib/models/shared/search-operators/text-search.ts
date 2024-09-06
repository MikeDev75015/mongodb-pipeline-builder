import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The text operator performs a full-text search using the analyzer that you specify in the index configuration. If
 * you omit an analyzer, the text operator uses the default standard analyzer.
 */
export type TextSearch = {
  text: {
    /**
     * The string or strings to search for. If there are multiple terms in a string, Atlas Search also looks for a
     * match for each term in the string separately.
     */
    query: MayBeArray<string>;
    /**
     * The indexed field or fields to search. You can also specify a wildcard path to search. See path construction for
     * more information.
     */
    path: MayBeArray<string>;
    /**
     * Enable fuzzy search. Find strings which are similar to the search term or terms. You can't use fuzzy with
     * synonyms.
     */
    fuzzy?: {
      /**
       * Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2.
       */
      maxEdits?: number;
      /**
       * Number of characters at the beginning of each term in the result that must exactly match.
       */
      prefixLength?: number;
      /**
       * Maximum number of variations to generate and search for. This limit applies on a per-token basis.
       */
      maxExpansions?: number;
    };
    /**
     * The score assigned to matching search term results. Use one of the following options to modify the score:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score using the given expression.
     *
     * Note
     * When you query values in arrays, Atlas Search doesn't alter the score of the matching results based on the
     * number of values inside the array that matched the query. The score would be the same as a single match
     * regardless of the number of matches inside an array.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
    /**
     * Required for running queries using synonyms.
     *
     * Name of the synonym mapping definition in the index definition. Value can't be an empty string. You can't use
     * fuzzy with synonyms.
     *
     * text queries that use synonyms look for a conjunction (AND) of query tokens. text queries that don't use
     * synonyms search for a disjunction (OR) of query tokens. To run text queries that use synonyms and search for a
     * disjunction (OR) of query tokens also, use the compound operator. For example:
     *
     * "compound": {
     *   "should": [
     *     {
     *       "text": {
     *         "path": "a",
     *         "query": "my query",
     *         "synonyms": "mySynonyms"
     *       }
     *     },
     *     {
     *       "text": {
     *         "path": "a",
     *         "query": "my query"
     *       }
     *     }
     *   ]
     * }
     *
     * Note
     * The amount of time that Atlas Search takes to execute queries that use synonym mappings depends on the number
     * and size of documents in the synonym source collection. A query that uses a synonym mapping that is based on
     * very few synonym documents might be faster than a query that uses a synonym mapping that is based on many
     * synonym documents.
     */
    synonyms?: string;
  };
};
