/**
 * The Atlas Search highlight option adds fields to the result set that display search terms in their original context.
 * You can use it in conjunction with all $search operators to display search terms as they appear in the returned
 * documents, along with the adjacent text content (if any). highlight results are returned as part of the $meta field.
 */
export type HighlightOptions = {
  /**
   * Document field to search. The path field may contain:
   *
   * A string
   *
   * An array of strings
   *
   * A multi analyzer specification
   *
   * An array containing a combination of strings and multi analyzer specifications
   *
   * A wildcard character *
   *
   * See Construct a Query Path for more information.
   */
  path: string;
  /**
   * Maximum number of characters to examine on a document when performing highlighting for a field. If omitted,
   * defaults to 500,000, which means that Atlas Search only examines the first 500,000 characters in the search field
   * in each document for highlighting.
   */
  maxCharsToExamine?: number;
  /**
   * Number of high-scoring passages to return per document in the highlights results for each field. A passage is
   * roughly the length of a sentence. If omitted, defaults to 5, which means that for each document, Atlas Search
   * returns the top 5 highest-scoring passages that match the search text.
   */
  maxNumPassages?: number;
};
