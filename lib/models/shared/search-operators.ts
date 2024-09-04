import { AutocompleteSearch } from './search-operators/autocomplete-search';
import { CompoundSearch } from './search-operators/compound-search';
import { EmbeddedDocumentSearch } from './search-operators/embedded-document-search';
import { EqualsSearch } from './search-operators/equals-search';
import { ExistsSearch } from './search-operators/exists-search';
import { GeoShapeSearch } from './search-operators/geo-shape-search';
import { GeoWithinSearch } from './search-operators/geo-within-search';
import { InSearch } from './search-operators/in-search';
import { KnnBetaSearch } from './search-operators/knn-beta-search';
import { MoreLikeThisSearch } from './search-operators/more-like-this-search';
import { NearSearch } from './search-operators/near-search';
import { PhraseSearch } from './search-operators/phrase-search';
import { QueryStringSearch } from './search-operators/query-string-search';
import { RangeSearch } from './search-operators/range-search';
import { RegexSearch } from './search-operators/regex-search';
import { SpanSearch } from './search-operators/span-search';
import { TextSearch } from './search-operators/text-search';
import { WildcardSearch } from './search-operators/wildcard-search';

export type SearchOperatorNames =
  | 'autocomplete' // Performs a search-as-you-type query from an incomplete input string.
  | 'compound' // Combines other operators into a single query.
  | 'embeddedDocument' // Queries fields in embedded documents, which are documents that are elements of an array.
  | 'equals' // Works in conjunction with the boolean and objectId data types.
  | 'exists' // Tests for the presence of a specified field.
  | 'geoShape' // Queries for values with specified geo shapes.
  | 'geoWithin' // Queries for points within specified geographic shapes. in //Queries both single value and array of
  // values.
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

export type SearchOperator =
  AutocompleteSearch
  | CompoundSearch
  | EmbeddedDocumentSearch
  | EqualsSearch
  | ExistsSearch
  | GeoShapeSearch
  | GeoWithinSearch
  | InSearch
  | KnnBetaSearch
  | MoreLikeThisSearch
  | NearSearch
  | PhraseSearch
  | QueryStringSearch
  | RangeSearch
  | RegexSearch
  | SpanSearch
  | TextSearch
  | WildcardSearch;

export type SearchOperators = Partial<
  AutocompleteSearch
  & CompoundSearch
  & EmbeddedDocumentSearch
  & EqualsSearch
  & ExistsSearch
  & GeoShapeSearch
  & GeoWithinSearch
  & InSearch
  & KnnBetaSearch
  & MoreLikeThisSearch
  & NearSearch
  & PhraseSearch
  & QueryStringSearch
  & RangeSearch
  & RegexSearch
  & SpanSearch
  & TextSearch
  & WildcardSearch
>;
