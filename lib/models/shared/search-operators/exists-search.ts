import { ScoreOptions } from '../score-options';

/**
 * The exists operator tests if a path to a specified indexed field name exists in a document. If the specified field
 * exists but is not indexed, the document is not included with the result set. exists is often used as part of a
 * compound query in conjunction with other search clauses.
 */
export type ExistsSearch = {
  exists: {
    /**
     * Indexed field to search.
     */
    path: string;
    /**
     * Score to assign to matching search results. To learn more about the options to modify the default score, see
     * Score the Documents in the Results.
     */
    score?: ScoreOptions;
  };
};
