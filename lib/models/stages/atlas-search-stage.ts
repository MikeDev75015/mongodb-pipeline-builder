export type SearchOperator =
 | 'autocomplete' // Performs a search-as-you-type query from an incomplete input string.
 | 'compound' // Combines other operators into a single query.
 | 'embeddedDocument' // Queries fields in embedded documents, which are documents that are elements of an array.
 | 'equals' // Works in conjunction with the boolean and objectId data types.
 | 'exists' // Tests for the presence of a specified field.
 | 'geoShape' // Queries for values with specified geo shapes.
 | 'geoWithin' // Queries for points within specified geographic shapes. in //Queries both single value and array of values.
 | 'knnBeta' // Performs semantic search using Hierarchical Navigable Small Worlds algorithm.
 | 'moreLikeThis' // Queries for similar documents.
 | 'near' // Queries for values near a specified number, date, or geo point.
 | 'phrase' // Searches documents for terms in an order similar to the query.
 | 'queryString' // Supports querying a combination of indexed fields and values.
 | 'range' // Queries for values within a specific numeric or date range.
 | 'regex' // Interprets the query field as a regular expression.
 | 'span' // Specifies relative positional requirements for query predicates within specified regions of a text field.
 | 'text' // Performs textual analyzed search.
 | 'wildcard'; // Supports special characters in the query string that can match any character.

type Compound = {
  must?: { [SearchOperator: string]: { [key: string]: any } }[];
  mustNot?: { [SearchOperator: string]: { [key: string]: any } }[];
  should?: { [SearchOperator: string]: { [key: string]: any } }[];
  filter?: { [SearchOperator: string]: { [key: string]: any } }[];
  score?: { [SearchOperator: string]: { [key: string]: any } };
};

/**
 * Search Payload Interface
 */
export type AtlasSearchStage = {
  /**
   * 'collector-name'?: { [key: string]: any }; // collector-specification
   * Conditional. Name of the collector to use with the query. You can provide a document that contains the
   * collector-specific options as the value for this field. Either this or <operator-name> is required.
   */

  /**
   * 'operator-name'?: { [key: string]: any }; // operator-specification
   * Conditional. Name of the operator to search with. You can provide a document that contains the operator-specific
   * options as the value for this field. Either this or <collector-name> is required. Use the compound operator to run
   * a compound query with multiple operators.
   */

  /**
   * Optional. Document that specifies the count options for retrieving a count of the results. To learn more, see
   * Count Atlas Search Results.
   */
  count?: { [key: string]: any }; // count-options
  /**
   * Optional. Document that specifies the highlighting options for displaying search terms in their original context.
   */
  highlight?: { [key: string]: any }; // highlight-options
  /**
   * Optional. Name of the Atlas Search index to use. If omitted, defaults to default.
   */
  index?: string;
  /**
   * Optional. Flag that specifies whether to perform a full document lookup on the backend database or return only
   * stored source fields directly from Atlas Search. If omitted, defaults to false. To learn more, see Return Stored
   * Source Fields.
   */
  returnStoredSource?: boolean;
  /**
   * Optional. Flag that specifies whether to retrieve a detailed breakdown of the score for the documents in the
   * results. If omitted, defaults to false. To view the details, you must use the $meta expression in the $project
   * stage. To learn more, see Return the Score Details.
   */
  scoreDetails?: boolean;
  /**
   * Optional. Document that specifies the fields to sort the Atlas Search results by in ascending or descending order.
   * You can sort by date, number (integer, float, and double values), and string values. To learn more, see Sort Atlas
   * Search Results.
   */
  sort?: { [fieldsToSort: string]: 1 | -1 };
  /**
   * Optional. Document that specifies the tracking option to retrieve analytics information on the search terms.
   */
  tracking?: { [key: string]: any }; // tracking-options

  /**
   * Combines other operators into a single query.
   */
  compound?: Compound;
};
