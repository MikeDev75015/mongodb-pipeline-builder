import { CountOptions, FacetSearch } from '../shared';

export type SearchMetaFields = {
  /**
   * Document that specifies the count options for retrieving a count of the results. To learn more, see Count Atlas
   * Search Results.
   */
  count?: CountOptions;
  /**
   * Name of the Atlas Search index to use. If omitted, defaults to default.
   *
   * Atlas Search doesn't return results if you misspell the index name or if the specified index doesn't already exist
   * on the cluster.
   */
  index?: string;
};

export type SearchMetaOperators = FacetSearch;

/**
 * The $searchMeta stage returns different types of metadata result documents.
 *
 * Note
 * To run $searchMeta queries over sharded collections, your cluster must run MongoDB v6.0 or later.
 */
export type SearchMetaStage = SearchMetaFields & SearchMetaOperators;