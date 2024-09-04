import { ScoreOptions } from '../score-options';
import { SearchOperator } from '../search-operators';

/**
 * The embeddedDocument operator is similar to $elemMatch operator. It constrains multiple query predicates to be
 * satisfied from a single element of an array of embedded documents. embeddedDocument can be used only for queries
 * over fields of the embeddedDocuments type.
 */
export type EmbeddedDocumentSearch = {
  embeddedDocument: {
    /**
     * Operator to use to query each document in the array of documents that you specify in the path. The moreLikeThis
     * operator is not supported.
     */
    operator: SearchOperator;
    /**
     * Indexed embeddedDocuments type field to search. The specified field must be a parent for all operators and fields
     * specified using the operator option. See Path Construction for more information.
     */
    path: string;
    /**
     * Score to assign to matching search results. You can use the embedded scoring option to configure scoring options.
     * To learn more, see Scoring Behavior.
     */
    score?: ScoreOptions;
  };
};
