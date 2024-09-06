import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The queryString operator supports querying a combination of indexed fields and values. You can perform text,
 * wildcard, regular expression, fuzzy, and range searches on string fields using the queryString operator.
 */
export type QueryStringSearch = {
  queryString: {
    /**
     * The indexed field to search by default. Atlas Search only searches the field in defaultPath if you omit the
     * field to search in the query.
     */
    defaultPath: string;
    /**
     * One or more indexed fields and values to search. Fields and values are colon-delimited. For example, to search
     * the plot field for the string baseball, use plot:baseball. The following operators are available to combine
     * multiple search criteria:
     *
     * You can combine the fields and values using the following:
     *
     * AND
     * Indicates AND boolean operator. All search values must be present for a document to be included in the results.
     * OR
     * Indicates OR boolean operator. At least one of the search value must be present for a document to be included in
     * the results.
     * NOT
     * Indicates NOT boolean operator. Specified search value must be absent for a document to be included in the
     * results.
     * TO
     * Indicates the range to search. You can use [] for an inclusive range, {} for an exclusive range, or {] and [}
     * for an half-open range. Any value that falls within the specified range must be present for a document to be
     * included in the results.
     * ()
     * Delimiters for subqueries. Use the parentheses to group fields and values to search.
     * Tip
     * See also:
     * Examples for some sample queries that use the operators and delimiters to search the sample movies collection.
     *
     * You can run wildcard and regular expression queries using the following:
     *
     * ?
     * Indicates any single character to match.
     * *
     * Indicates 0 or more characters to match.
     * /
     * Delimiter for regular expression.
     * ~
     * Indicates fuzzy search to find strings which are similar to the search term. If you use this with multiple
     * terms in a string, the queryString operator does a proximity search for the terms within the specified number
     * of terms.
     *
     * Note
     * For fuzzy search, the queryString operator matches terms up to at most 2 edits. Higher distances are not useful
     * as it might match a significant amount of the dictionary term. For example, "foo":"stop"~2 is equal to the
     * following:
     *
     * { "path": "foo", "query": "stop", "maxEdits": 2 }
     * For proximity search, the queryString operator matches terms using the distance specified between words in the
     * search phrase. For example, "foo":"New York"~2 is equal to the following:
     *
     * { "path": "foo", "query": "New York", "slop": 2 }
     * Note
     * The queryString operator doesn't support a wildcard query with * as the first character in the query. The
     * queryString operator treats any character preceding the * as prefix or as characters that must exactly match.
     */
    query: string;
    /**
     * The score assigned to matching search results. You can modify the default score using the following options:
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
