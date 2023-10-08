export type ListSampledQueriesStage = {
  /**
   * The following aggregation operation lists all sampled queries for all collections in the replica set:
   *
   * { $listSampledQueries: {} }
   *
   * The following aggregation operation lists all sampled queries for a post collections on the social database:
   *
   * { $listSampledQueries: { namespace: "social.post" } }
   */
  namespace?: string;
};
