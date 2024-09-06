import { ObjectExpression } from '../../core/expression';
import { MayBeArray } from '../../core/may-be-array';
import { ScoreBoost, ScoreConstant, ScoreFunction } from '../score-options';

/**
 * The moreLikeThis operator returns documents similar to input documents. The moreLikeThis operator allows you to
 * build features for your applications that display similar or alternative results based on one or more given
 * documents.
 *
 * Behavior
 * When you run a moreLikeThis query, Atlas Search performs these actions:
 *
 * Extracts a limited number of most representative terms based on the input documents that you specify in the
 * operator's like option.
 *
 * Creates a disjunction (OR) query to find similar documents based on the most representative terms and returns the
 * results.
 *
 * The moreLikeThis operator performs a search for similar documents using the analyzer that you specify in the index
 * configuration. If you omit the analyzer in the index definition, the moreLikeThis operator uses the default standard
 * analyzer. If you specify multiple analyzers, the moreLikeThis operator runs the input text through each analyzer,
 * searches, and returns results for all analyzers.
 *
 * To view the disjunction (OR) that Atlas Search constructs to find similar documents, use explain with your
 * moreLikeThis operator query.
 */
export type MoreLikeThisSearch = {
  moreLikeThis: {
    /**
     * One or more BSON documents that Atlas Search uses to extract representative terms to query for.
     */
    like: MayBeArray<ObjectExpression>;
    /**
     * Score to assign to matching search results. You can modify the default score using the following options:
     *
     * boost: multiply the result score by the given number.
     *
     * constant: replace the result score with the given number.
     *
     * function: replace the result score with the given expression.
     *
     * For information on using score in your query, see Score the Documents in the Results.
     *
     * When you query values in arrays, Atlas Search doesn't alter the score of the matching results based on the
     * number of values inside the array that matched the query. The score would be the same as a single match
     * regardless of the number of matches inside an array.
     */
    score?: ScoreBoost | ScoreConstant | ScoreFunction;
  };
};
