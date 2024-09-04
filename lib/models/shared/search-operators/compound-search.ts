import { ScoreOptions } from '../score-options';
import { SearchOperator } from '../search-operators';

/**
 * The compound operator combines two or more operators into a single query. Each element of a compound query is called
 * a clause, and each clause consists of one or more sub-queries. Atlas Search provides a sample compound query template
 * with guidance. To learn more, see View Query Guidance Template.
 */
export type CompoundSearch = {
  compound: {
    /**
     * Clauses that must match to for a document to be included in the results. The returned score is the sum of the
     * scores of all the subqueries in the clause.
     *
     * Maps to the AND boolean operator.
     */
    must?: SearchOperator[];
    /**
     * Clauses that must not match for a document to be included in the results. mustNot clauses don't contribute to a
     * returned document's score.
     *
     * Maps to the AND NOT boolean operator.
     */
    mustNot?: SearchOperator[];
    /**
     * Clauses that you prefer to match in documents that are included in the results. Documents that contain a match
     * for a should clause have higher scores than documents that don't contain a should clause. The returned score is
     * the sum of the scores of all the subqueries in the clause.
     *
     * If you use more than one should clause, you can use the minimumShouldMatch option to specify a minimum number of
     * should clauses that must match to include a document in the results. If omitted, the minimumShouldMatch option
     * defaults to 0.
     *
     * See an example.
     *
     * Maps to the OR boolean operator.
     *
     * If you use only the should clause inside a compound query, the compound operator treats the array of the should
     * clause queries as a logical OR. Atlas Search must find a match for at least one should criteria to return any
     * results. When you specify multiple should clause criteria with the minimumShouldMatch option set to 0, Atlas
     * Search treats minimumShouldMatch as set to 1 and must match at least one criteria to return any results.
     */
    should?: SearchOperator[];
    /**
     * Clauses that must all match for a document to be included in the results. filter clauses do not contribute to a
     * returned document's score.
     *
     * Example
     * For example, you can replace the $match stage with the compound operator filter condition in the $search stage:
     *
     * {
     *   "$match": {
     *     "role": { "$in": [ "CLIENT", "PROFESSIONAL" ] }
     *   }
     * }
     * You can use the filter option instead:
     *
     * $search: {
     *   "compound": {
     *     "filter": [{
     *       "queryString": {
     *         "defaultPath": "role",
     *         "query": "CLIENT OR PROFESSIONAL"
     *       }
     *     }]
     *   }
     * }
     * See another filter example.
     */
    filter?: SearchOperator[];
    /**
     * Modify the score of the entire compound clause. You can use score to boost, replace, or otherwise alter the
     * score. If you don't specify score, the returned score is the sum of the scores of all the subqueries in the must
     * and should clauses that generated a match. To learn more, see Scoring Behavior.
     */
    score?: ScoreOptions;
  };
};
