/**
 * The Atlas Search count option adds a field to the metadata results document that displays a count of the search
 * results for the query. You can use count to determine the size of the result set. You can use it in the $search or
 * $searchMeta stage. You must use it in conjuction with the operators or collectors to display either the total number
 * of documents or a lower bound on the number of documents that match the query.
 *
 * Note
 * To use count option over sharded collections, your cluster must run MongoDB v6.0 or higher. On sharded Atlas
 * clusters running MongoDB v7.2.0, $searchMeta might return an error for count.
 *
 * MongoDB recommends using count with the $searchMeta stage to retrieve metadata results only for the query. To
 * retrieve metadata results and query results using the $search stage, you must use the $$SEARCH_META variable. To
 * learn more, see SEARCH_META Aggregation Variable.
 *
 * Note
 * Atlas Search doesn't include the count results in the results for queries run with count in explain mode.
 */
export type CountOptions = {
  /**
   * Type of count of the documents in the result set. Value can be one of the following:
   *
   * lowerBound - for a lower bound count of the number of documents that match the query. You can set the threshold
   * for the lower bound number.
   *
   * total - for an exact count of the number of documents that match the query. If the result set is large, Atlas
   * Search might take longer than for lowerBound to return the count.
   *
   * If omitted, defaults to lowerBound.
   */
  type?: 'lowerBound' | 'total';
  /**
   * Number of documents to include in the exact count if type is lowerBound. If omitted, defaults to 1000, which
   * indicates that any number up to 1000 is an exact count and any number above 1000 is a rough count of the number of
   * documents in the result.
   */
  threshold?: number;
};
