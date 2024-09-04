import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The autocomplete operator performs a search for a word or phrase that contains a sequence of characters from an
 * incomplete input string. The fields that you intend to query with the autocomplete operator must be indexed with the
 * autocomplete data type in the collection's index definition.
 *
 * Note
 * Atlas Search might return inaccurate results for queries with more than three words in a single string.
 *
 * Sample Use Cases
 * You can use the autocomplete operator with search-as-you-type applications to predict words with increasing accuracy
 * as characters are entered in your application's search field. autocomplete returns results that contain predicted
 * words based on the tokenization strategy specified in the index definition for autocompletion.
 *
 * If you want to build suggestions or dropdowns using the Atlas Search autocomplete operator, we recommend that you
 * query a collection of suggested search terms or use past search terms to populate the dropdown. If you create a
 * separate collection of suggested search terms, you can define synonym mappings in your Atlas Search index to search
 * your collection for the exact or alternative words. You can track search terms and view metrics for search terms to
 * build your collection.
 */
export type AutocompleteSearch = {
  autocomplete: {
    /**
     * String or strings to search for. If there are multiple terms in a string, Atlas Search also looks for a match
     * for each term in the string separately.
     */
    query: MayBeArray<string>;
    /**
     * Indexed autocomplete type of field to search.
     *
     * Tip
     * See also:
     * path construction
     *
     * Note
     * The autocomplete operator does not support multi in the field path. It also doesn't support an array of fields
     * or wildcard (*) as value for path. To learn more, see path construction. For an example of an autocomplete
     * operator query across multiple fields, see Search Across Multiple Fields or the Advanced Example in the tutorial.
     */
    path: string;
    /**
     * Enable fuzzy search. Find strings which are similar to the search term or terms.
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
     * Score to assign to the matching search term results. Use one of the following options to modify the default score:
     *
     * boost
     * Multiply the result score by the given number.
     * constant
     * Replace the result score with the given number.
     * function
     * Replace the result score with the given expression.
     * For information on using score in your query, see Score the Documents in the Results.
     *
     * Note
     * autocomplete offers less fidelity in score in exchange for faster query execution.
     *
     * To learn more, see Scoring Behavior.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
    /**
     * Order in which to search for tokens. Value can be one of the following:
     *
     * any
     * Indicates tokens in the query can appear in any order in the documents. Results contain documents where the
     * tokens appear sequentially and non-sequentially. However, results where the tokens appear sequentially score
     * higher than other, non-sequential values.
     * sequential
     * Indicates tokens in the query must appear adjacent to each other or in the order specified in the query in the
     * documents. Results contain only documents where the tokens appear sequentially.
     */
    tokenOrder?: 'sequential' | 'any';
  };
};
