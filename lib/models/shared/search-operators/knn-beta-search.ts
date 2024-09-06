import { ScoreOptions } from '../score-options';
import { SearchOperator } from '../search-operators';

/**
 * The knnBeta operator uses Hierarchical Navigable Small Worlds algorithm to perform semantic search. You can use
 * Atlas Search support for kNN query to search similar to a selected product, search for images, etc.
 */
export type KnnBetaSearch = {
  knnBeta: {
    /**
     * Any Atlas Search operator to filter the documents based on metadata or certain search criteria, which can help
     * narrow down the scope of vector search.
     */
    filter?: SearchOperator;
    /**
     * Number of nearest neighbors to return. You can specify a number higher than the number of documents to return
     * ($limit) to increase accuracy.
     */
    k: number;
    /**
     * Indexed knnVector type field to search. See Path Construction for more information.
     */
    path: string;
    /**
     * Score assigned to matching documents in the results. To learn more, see scoring behavior.
     */
    score?: ScoreOptions;
    /**
     * Array of numbers of BSON types int or double that represent the query vector. The array size must match the
     * number of vector dimensions specified in the index for the field.
     */
    vector: number[];
  };
};
