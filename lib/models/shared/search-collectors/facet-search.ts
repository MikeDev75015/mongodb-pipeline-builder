import { SearchOperator } from '../search-operators';

/**
 * String facets allow you to narrow down Atlas Search results based on the most frequent string values in the
 * specified string field. Note that the string field must be indexed as stringFacet. To facet on string fields in
 * embedded documents, you must also index the parent fields as the document type.
 *
 * Note
 * When you facet on a string field inside embedded documents, Atlas Search returns facet count for only the number of
 * matching parent documents.
 */
type FacetStringSearch = {
  /**
   * Type of facet. Value must be string.
   */
  type: 'string';
  /**
   * Field path to facet on. You can specify a field that is indexed as a stringFacet.
   */
  path: string;
  /**
   * Maximum number of facet categories to return in the results. Value must be less than or equal to 1000. If
   * specified, Atlas Search may return fewer categories than requested if the data is grouped into fewer categories
   * than your requested number. If omitted, defaults to 10, which means that Atlas Search will return only the top
   * 10 facet categories by count.
   */
  numBuckets?: number;
};

/**
 * Numeric facets allow you to determine the frequency of numeric values in your search results by breaking the results
 * into separate ranges of numbers.
 *
 * Note
 * Limitation
 * You can't facet on numeric fields in embedded documents.
 */
type FacetNumericSearch = {
  /**
   * Type of facet. Value must be number.
   */
  type: 'number';
  /**
   * Field path to facet on. You can specify a field that is indexed as the numberFacet type.
   */
  path: string;
  /**
   * List of numeric values, in ascending order, that specify the boundaries for each bucket. You must specify at least
   * two boundaries. Each adjacent pair of values acts as the inclusive lower bound and the exclusive upper bound for
   * the bucket. You can specify any combination of values of the following BSON types:
   *
   * 32-bit integer (int32)
   *
   * 64-bit integer (int64)
   *
   * 64-bit binary floating point (double)
   */
  boundaries: number[];
  /**
   * Name of an additional bucket that counts documents returned from the operator that do not fall within the
   * specified boundaries. If omitted, Atlas Search includes the results of the facet operator that do not fall under
   * a specified bucket also, but doesn't include it in any bucket counts.
   */
  default?: string;
};

/**
 * Date facets allow you to narrow down search results based on a date.
 *
 * Note
 * Limitation
 * You can't facet on date fields in embedded documents.
 */
type FacetDateSearch = {
  /**
   * Type of facet. Value must be date.
   */
  type: 'date';
  /**
   * Field path to facet on. You can specify a field that is indexed as a dateFacet type.
   */
  path: string;
  /**
   * List of date values that specify the boundaries for each bucket. You must specify:
   *
   * At least two boundaries
   *
   * Values in ascending order, with the earliest date first
   *
   * Each adjacent pair of values acts as the inclusive lower bound and the exclusive upper bound for the bucket.
   */
  boundaries: number[];
  /**
   * Name of an additional bucket that counts documents returned from the operator that do not fall within the
   * specified boundaries. If omitted, Atlas Search includes the results of the facet operator that do not fall under
   * a specified bucket also, but Atlas Search doesn't include these results in any bucket counts.
   */
  default?: string;
};

/**
 * The facet collector groups results by values or ranges in the specified faceted fields and returns the count for each
 * of those groups.
 *
 * You can use facet with both the $search and $searchMeta stages. MongoDB recommends using facet with the $searchMeta
 * stage to retrieve metadata results only for the query. To retrieve metadata results and query results using the
 * $search stage, you must use the $$SEARCH_META aggregation variable. See SEARCH_META Aggregation Variable to learn
 * more
 */
export type FacetSearch = {
  facet: {
    /**
     * Operator to use to perform the facet over. If omitted, Atlas Search performs the facet over all documents in the
     * collection.
     */
    operator?: SearchOperator;
    /**
     * Information for bucketing the data for each facet. You must specify at least one Facet Definition.
     */
    facets: {
      [facetName: string]: FacetStringSearch | FacetNumericSearch | FacetDateSearch;
    };
  };
};
