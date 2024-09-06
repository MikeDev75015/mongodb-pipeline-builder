/**
 * The Atlas Search tracking option allows you to track your search queries. When you track your queries, Atlas tracks
 * the search terms and provides analytics information about the search terms in your queries. You can use the
 * analytics information to improve the quality of your search application and to refine your query to return relevant
 * results.
 *
 * Note
 * You must have an M10 or higher cluster to take advantage of the analytics information returned by Atlas Search
 * tracking option. Atlas doesn't track search terms or display analytics for queries on free and shared-tier clusters.
 */
export type TrackingOptions = {
  /**
   * Text or term associated with the query to track. You can specify only one term per query.
   */
  searchTerms: string;
};
