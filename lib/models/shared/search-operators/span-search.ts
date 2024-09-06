import { ScoreOptions } from '../score-options';

/**
 * You can use the term operator to specify the terms to search. The term operator is required and when you use it with
 * span positional operators, it must be the innermost child of the positional operators.
 */
type SpanTerm = {
  term: {
    /**
     * Indexed field to search.
     */
    path: string;
    /**
     * Term or phrase to search.
     */
    query: string;
  };
};

/**
 * The contains positional operator matches terms that are contained within other terms. You can use positional
 * operators recursively or just the term operator within contains to specify the search terms.
 */
type SpanContains = {
  contains: {
    /**
     * One or more positional operators specified recursively or just the term operator. The following table shows the
     * type of query that span executes for big based on the value of spanToReturn.
     *
     * outer
     * span matches terms from big that contain at least one term from little.
     * inner
     * span matches terms from little that are within terms from big.
     */
    big: object;
    /**
     * One or more positional operators specified recursively or just the term operator. The following table shows the
     * type of query that span executes for little based on the value of spanToReturn.
     *
     * inner
     * span matches terms from little that are within terms from big.
     * outer
     * span matches terms from big that contain at least one term from little.
     */
    little: object;
    /**
     * Score to apply to the results of this search.
     */
    score?: ScoreOptions;
    /**
     * Type of query to execute and matching results to return. Value can be one of the following:
     *
     * inner - to execute a within query that matches terms from little that are inside of terms from big
     *
     * outer - to execute a contains query that matches terms from big that contain at least one term from little
     */
    spanToReturn: 'inner' | 'outer';
  };
};

/**
 * The first positional operator identifies the position of the search term by using a specified number. You can
 * specify the search terms using positional operators recursively, or just the term operator. span matches documents
 * where the position of the search term is less than or equal to the specified number.
 */
type SpanFirst = {
  first: {
    /**
     * Number that specifies the position of the search term. If you specify a search for multiple terms, the last term
     * should be less than or equal to this value. If omitted, defaults to 3.
     */
    endPositionLte?: number;
    /**
     * Document that contains the positional operators or term operator options.
     */
    operator: SpanOperators;
    /**
     * Score to apply to the results of this search.
     */
    score?: ScoreOptions;
  };
};

/**
 * The near positional operator matches two or more clauses that contain the search term near each other. You can
 * specify the search terms using a list of positional operators recursively or just the term operator.
 */
type SpanNear = {
  near: {
    /**
     * Span clauses that must be near one another. Clauses can't be empty. Each document contains span positional or
     * just the term operator options.
     */
    clauses: SpanOperators[];
    /**
     * Flag that specifies whether the search for terms in the clauses must be in the order specified and must not be
     * overlapping.
     *
     * Value can be one of the following:
     *
     * true - to search for terms in the clauses in the specified order specified, without overlapping
     *
     * false - to search for terms in the clauses in any order
     *
     * If omitted, defaults to false.
     */
    inOrder?: boolean;
    /**
     * Score to apply to the results of this search.
     */
    score?: ScoreOptions;
    /**
     * Allowable distance between terms in the clauses. Lower values allow less positional distance between the terms
     * and greater values allow more distance between the words to satisfy the query. The default is 0, which means
     * that words in the different clauses must be adjacent to be considered a match.
     */
    slop?: number;
  };
};

/**
 * The or positional operator matches any of two or more clauses. You can specify the search terms using a list of
 * positional operators recursively or just the term operator.
 */
type SpanOr = {
  or: {
    /**
     * Span clauses that specify the search terms. One of the clauses must match, and clauses can't be empty. Each
     * document must contain span positional operators specified recursively or just the term operator options.
     */
    clauses: SpanOperators[];
    /**
     * Score to apply to the results of this search.
     */
    score?: ScoreOptions;
  };
};

/**
 * The subtract positional operator removes matches that overlap with another match. You can specify the search terms
 * using a list of positional operators recursively or just the term operator. The subtract clause can be used to
 * exclude certain strings from your search results.
 */
type SpanSubtract = {
  subtract: {
    /**
     * Document that specifies the term or phrase matches to remove that overlap with the term or phrase matches
     * specified in the include field. You can specify the term or phrase using any span positional operators and the
     * term operator.
     */
    exclude: SpanOperators;
    /**
     * Document that specifies the term matches to include using any positional operators or just the term operator.
     */
    include: SpanOperators;
    /**
     * Score to apply to the results of this search.
     */
    score?: ScoreOptions;
  };
};

type SpanOperators = SpanTerm | SpanContains | SpanFirst | SpanNear | SpanOr | SpanSubtract;

/**
 * The span operator finds text search matches within regions of a text field. You can use it to find strings which
 * are near each other to specified degrees of precision. The span operator is more computationally intensive than
 * other operators, because queries must keep track of positional information.
 *
 * span is a term-level operator, which means that the query field is not analyzed. Term-level operators work well
 * with the Keyword Analyzer because the query field is treated as a single term, with special characters included.
 *
 * span queries aren't ranked by score.
 */
export type SpanSearch = {
  span: SpanOperators;
};
