import {
  BucketAutoStage,
  BucketStage,
  CollStatsStage,
  CurrentOpStage,
  FacetStage,
  GeoNearStage,
  GraphLookupStage,
  GroupStage,
  LookupStage,
  MergeStage,
  OutStage,
  ReplaceRootStage,
  SampleStage,
  UnionWithStage,
  UnwindStage,
} from '../';
import { AddFieldsStage } from '../stages/add-fields-stage';
import { AtlasSearchStage } from '../stages/atlas-search-stage';
import { ChangeStreamSplitLargeEventStage } from '../stages/change-stream-split-large-event-stage';
import { ChangeStreamStage } from '../stages/change-stream-stage';
import { DensifyStage } from '../stages/densify-stage';
import { DocumentsStage } from '../stages/documents-stage';
import { FillStage } from '../stages/fill-stage';
import { IndexStatsStage } from '../stages/index-stats-stage';
import { ListSampledQueriesStage } from '../stages/list-sampled-queries-stage';
import { ListSearchIndexesStage } from '../stages/list-search-indexes-stage';
import { ListSessionsStage } from '../stages/list-sessions-stage';
import { MatchStage } from '../stages/match-stage';
import { PlanCacheStatsStage } from '../stages/plan-cache-stats-stage';
import { ProjectStage } from '../stages/project-stage';
import { RedactStage } from '../stages/redact-stage';
import { ReplaceWithStage } from '../stages/replace-with-stage';
import { SetStage } from '../stages/set-stage';
import { SetWindowFieldsStage } from '../stages/set-window-fields-stage';
import { ShardedDataDistributionStage } from '../stages/sharded-data-distribution-stage';
import { SortByCountStage } from '../stages/sort-by-count-stage';
import { SortStage } from '../stages/sort-stage';
import { UnsetStage } from '../stages/unset-stage';

/**
 * interface PipeLineStage
 */
export type PipeLineStage = {
  /**
   * Adds new fields to documents. Similar to $project, $addFields reshapes each document in the stream; specifically,
   * by adding new fields to output documents that contain both the existing fields from the input documents and the
   * newly added fields.
   * $set is an alias for $addFields.
   */
  $addFields?: AddFieldsStage;
  /**
   * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket
   * boundaries.
   */
  $bucket?: BucketStage;
  /**
   * Categorizes incoming documents into a specific number of groups, called buckets, based on a specified
   * expression.
   * Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the
   * specified number of buckets.
   */
  $bucketAuto?: BucketAutoStage;
  /**
   * Returns a Change Stream cursor on a collection, a database, or an entire cluster. Must be used as the first
   * stage in an aggregation pipeline.
   */
  $changeStream?: ChangeStreamStage; ///////////////////////////////////////////////////////////////////////
  /**
   * New in version 7.0.
   *
   * If a change stream has large events that exceed 16 MB, a BSONObjectTooLarge exception is returned. Starting in
   * MongoDB 7.0, you can use a $changeStreamSplitLargeEvent stage to split the events into smaller fragments.
   *
   * You should only use $changeStreamSplitLargeEvent when strictly necessary. For example, if your application
   * requires full document pre- or post-images, and generates large events that exceed 16 MB, use
   * $changeStreamSplitLargeEvent.
   *
   * Before you decide to use $changeStreamSplitLargeEvent, you should first try to reduce the change event size. For
   * example:
   *
   * Don't request document pre- or post-images unless your application requires them. This generates fullDocument
   * and fullDocumentBeforeChange fields in more cases, which are typically the largest objects in a change event.
   *
   * Use a $project stage to include only the fields necessary for your application. This reduces the change event
   * size and avoids the additional time to split large events into fragments. This allows more change events to be
   * returned in each batch.
   *
   * You can only have one $changeStreamSplitLargeEvent stage in your pipeline, and it must be the last stage. You
   * can only use $changeStreamSplitLargeEvent in a $changeStream pipeline.
   */
  $changeStreamSplitLargeEvent?: ChangeStreamSplitLargeEventStage; ///////////////////////////////////////////
  /**
   * Returns a count of the number of documents at this stage of the aggregation pipeline.
   */
  $collStats?: CollStatsStage;
  /**
   * $count
   * Passes a document to the next stage that contains a count of the number of documents input to the stage.
   */
  $count?: string;
  /**
   * Returns a stream of documents containing information on active and/or dormant operations as well as inactive
   * sessions that are holding locks as part of a transaction. The stage returns a document for each operation or
   * session.
   */
  $currentOp?: CurrentOpStage;
  /**
   * Creates new documents in a sequence of documents where certain values in a field are missing.
   *
   * You can use $densify to:
   *
   * Fill gaps in time series data.
   *
   * Add missing values between groups of data.
   *
   * Populate your data with a specified range of values.
   */
  $densify?: DensifyStage; //////////////////////////////////////////////////////////////////////////////
  /**
   * Returns literal documents from input values.
   */
  $documents?: DocumentsStage; //////////////////////////////////////////////////////////////////////////////
  /**
   * Processes multiple aggregation pipelines within a single stage on the same set of input documents. Enables the
   * creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a
   * single stage.
   */
  $facet?: FacetStage;
  /**
   * New in version 5.3.
   *
   * Populates null and missing field values within documents.
   *
   * You can use $fill to populate missing data points:
   *
   * In a sequence based on surrounding values.
   *
   * With a fixed value.
   */
  $fill?: FillStage; ////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an ordered stream of documents based on the proximity to a geospatial point. Incorporates the
   * functionality of $match, $sort, and $limit for geospatial data. The output documents include an additional
   * distance field and can include a location identifier field.
   */
  $geoNear?: GeoNearStage;
  /**
   * Performs a recursive search on a collection. To each output document, adds a new array field that contains the
   * traversal results of the recursive search for that document.
   */
  $graphLookup?: GraphLookupStage;
  /**
   * Groups input documents by a specified identifier expression and applies the accumulator expression(s), if
   * specified, to each group. Consumes all input documents and outputs one document per each distinct group. The
   * output documents only contain the identifier field and, if specified, accumulated fields.
   */
  $group?: GroupStage;
  /**
   * Returns statistics regarding the use of each index for the collection.
   */
  $indexStats?: IndexStatsStage;
  /**
   * Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document,
   * outputs either one document (for the first n documents) or zero documents (after the first n documents).
   */
  $limit?: number;
  /**
   * Lists the sessions cached in memory by the mongod or mongos instance.
   */
  $listLocalSessions?: ListSessionsStage; /////////////////////////////////////////////////////////////////
  /**
   * Returns sampled queries for all collections or a specific collection. Sampled queries are used by the
   * analyzeShardKey command to calculate metrics about the read and write distribution of a shard key.
   */
  $listSampledQueries?: ListSampledQueriesStage; ////////////////////////////////////////////////////////////////
  /**
   * Returns information about existing Atlas Search indexes on a specified collection.
   */
  $listSearchIndexes?: ListSearchIndexesStage; //////////////////////////////////////////////////////////////////////
  /**
   * Lists all sessions that have been active long enough to propagate to the system.sessions collection.
   */
  $listSessions?: ListSessionsStage;
  /**
   * Performs a left outer join to another collection in the same database to filter in documents from the “joined”
   * collection for processing.
   */
  $lookup?: LookupStage;
  /**
   * Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage.
   * $match uses standard MongoDB queries. For each input document, outputs either one document (a match) or zero
   * documents (no match).
   */
  $match?: MatchStage;
  /**
   * Writes the resulting documents of the aggregation pipeline to a collection. The stage can incorporate (insert
   * new
   * documents, merge documents, replace documents, keep existing documents, fail the operation, process documents
   * with a custom update pipeline) the results into an output collection. To use the $merge stage, it must be the
   * last stage in the pipeline.
   */
  $merge?: MergeStage;
  /**
   * Writes the resulting documents of the aggregation pipeline to a collection. To use the $out stage, it must be the
   * last stage in the pipeline.
   */
  $out?: OutStage;
  /**
   * Returns plan cache information for a collection.
   */
  $planCacheStats?: PlanCacheStatsStage;
  /**
   * Reshapes each document in the stream, such as by adding new fields or removing existing fields. For each input
   * document, outputs one document.
   * See also $unset for removing existing fields.
   */
  $project?: ProjectStage;
  /**
   * Reshapes each document in the stream by restricting the content for each document based on information stored in
   * the documents themselves. Incorporates the functionality of $project and $match. Can be used to implement field
   * level redaction. For each input document, outputs either one or zero documents.
   */
  $redact?: RedactStage;
  /**
   * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
   * document, including the _id field. Specify a document embedded in the input document to promote the embedded
   * document to the top level.
   * $replaceWith is an alias for $replaceRoot stage.
   */
  $replaceRoot?: ReplaceRootStage;
  /**
   * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
   * document, including the _id field. Specify a document embedded in the input document to promote the embedded
   * document to the top level.
   * $replaceWith is an alias for $replaceRoot stage.
   */
  $replaceWith?: ReplaceWithStage;
  /**
   * Randomly selects the specified number of documents from its input.
   */
  $sample?: SampleStage;
  /**
   * Performs a full-text search of the field or fields in an Atlas collection.
   * $search is only available for MongoDB Atlas clusters, and is not available for self-managed deployments.
   */
  $search?: AtlasSearchStage;
  /**
   * searchMeta returns different types of metadata result documents for Atlas Search queries on the field or fields in
   * an Atlas collection. The fields must be covered by an Atlas Search index
   */
  $searchMeta?: AtlasSearchStage;
  /**
   * Adds new fields to documents. Similar to $project, $set reshapes each document in the stream; specifically, by
   * adding new fields to output documents that contain both the existing fields from the input documents and the
   * newly added fields.
   * $set is an alias for $addFields stage.
   */
  $set?: SetStage;
  /**
   * New in version 5.0.
   *
   * Performs operations on a specified span of documents in a collection, known as a window, and returns the results
   * based on the chosen window operator.
   *
   * For example, you can use the $setWindowFields stage to output the:
   *
   * Difference in sales between two documents in a collection.
   *
   * Sales rankings.
   *
   * Cumulative sales totals.
   *
   * Analysis of complex time series information without exporting the data to an external database.
   */
  $setWindowFields?: SetWindowFieldsStage; ///////////////////////////////////////////////////////////////////////////
  /**
   * New in version 6.0.3.
   *
   * Returns information on the distribution of data in sharded collections.
   */
  $shardedDataDistribution?: ShardedDataDistributionStage; ////////////////////////////////////////////////////////////
  /**
   * Skips the first n documents where n is the specified skip number and passes the remaining documents unmodified to
   * the pipeline. For each input document, outputs either zero documents (for the first n documents) or one document
   * (if after the first n documents).
   */
  $skip?: number;
  /**
   * Reorders the document stream by a specified sort key. Only the order changes; the documents remain unmodified.
   * For each input document, outputs one document.
   */
  $sort?: SortStage;
  /**
   * Groups incoming documents based on the value of a specified expression, then computes the count of documents in
   * each distinct group.
   */
  $sortByCount?: SortByCountStage;
  /**
   * Performs a union of two collections; i.e. combines pipeline results from two collections into a single result
   * set.
   */
  $unionWith?: UnionWithStage;
  /**
   * Removes/excludes fields from documents.
   * $unset is an alias for $project stage that removes fields.
   */
  $unset?: UnsetStage;
  /**
   * Deconstructs an array field from the input documents to output a document for each element. Each output document
   * replaces the array with an element value. For each input document, outputs n documents where n is the number of
   * array elements and can be zero for an empty array.
   */
  $unwind?: UnwindStage;
};

export const ValidPipelineStageNameList = [
  '$addFields',
  '$bucket',
  '$bucketAuto',
  '$changeStream',
  '$changeStreamSplitLargeEvent',
  '$collStats',
  '$count',
  '$currentOp',
  '$densify',
  '$documents',
  '$facet',
  '$fill',
  '$geoNear',
  '$graphLookup',
  '$group',
  '$indexStats',
  '$limit',
  '$listLocalSessions',
  '$listSampledQueries',
  '$listSearchIndexes',
  '$listSessions',
  '$lookup',
  '$match',
  '$merge',
  '$out',
  '$planCacheStats',
  '$project',
  '$redact',
  '$replaceRoot',
  '$replaceWith',
  '$sample',
  '$search',
  '$searchMeta',
  '$set',
  '$setWindowFields',
  '$shardedDataDistribution',
  '$skip',
  '$sort',
  '$sortByCount',
  '$unionWith',
  '$unset',
  '$unwind',
];
