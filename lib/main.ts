import { STAGE_PAYLOAD_VALIDATORS_AVAILABLE, NON_DUPLICABLE_STAGE_LIST } from './constants';
import { IsValidName } from './decorators';
import { PipelineError } from './errors';
import { SampleSizeHelper } from './helpers';
import {
  AddFieldsStage,
  AtlasSearchStage,
  BucketAutoStage,
  BucketStage,
  ChangeStreamSplitLargeEventStage,
  ChangeStreamStage,
  CollStatsStage,
  CurrentOpStage,
  DebuggedAction,
  DensifyStage,
  DocumentsStage,
  FacetStage,
  FillStage,
  GeoNearStage,
  GraphLookupStage,
  GroupStage,
  IndexStatsStage,
  ListSampledQueriesStage,
  ListSearchIndexesStage,
  ListSessionsStage,
  LookupStage,
  MatchStage,
  MergeStage,
  OutStage,
  PipelineBuilderOptions,
  PipeLineStage,
  PipelineStageError,
  PlanCacheStatsStage,
  ProjectStage,
  RedactStage,
  ReplaceRootStage,
  ReplaceWithStage,
  SetStage,
  SetWindowFieldsStage,
  ShardedDataDistributionStage,
  SortByCountStage,
  SortStage,
  UnionWithStage,
  UnsetStage,
  UnwindStage,
  ValidPipelineStageNameList,
} from './models';

/**
 * The class of the pipeline builder object
 */
export class PipelineBuilder {
  /**
   * Contains the list of errors returned by the pipeline validator
   * @private
   */
  private stageErrorList: PipelineStageError[];

  /**
   * Contains the $skip and $limit stages for pagination
   * @private
   */
  private pagingStages: PipeLineStage[];

  /**
   * Contains debug status and information saved at each step
   * @private
   */
  private debugActionList: DebuggedAction[];

  /**
   * Contains the list of pipeline stages that have been added
   * @private
   */
  private readonly stageList: (PipeLineStage & { disableValidation?: boolean })[];

  /**
   * Default builder options
   * @private
   */
  private readonly builderOptions: PipelineBuilderOptions;

  /**
   * Contains the name of the pipeline
   * @private
   */
  @IsValidName({
    minLength: 1,
    maxLength: 64,
    noSpace: true,
    noSpecialChar: true,
  })
  private readonly pipelineName: string;

  /**
   * constructor
   * @param pipelineName The name of the pipeline
   * @param options Optional. Allows to enable logs and/or debug
   */
  constructor(
    pipelineName: string,
    { debug, logs }: Partial<PipelineBuilderOptions> = {},
  ) {
    this.pipelineName = pipelineName;
    this.builderOptions = { debug: debug ?? false, logs: logs ?? false };

    this.debugActionList = [];
    this.stageErrorList = [];
    this.stageList = [];
    this.pagingStages = [];

    this.saveActionToDebugHistoryList('constructor', { pipelineName }, { debug, logs });
  }

  /**
   * Returns the pipeline name
   * @returns {string}
   */
  get name() {
    return this.pipelineName;
  }

  // basics

  /**
   * Allows the user to insert their own stage into the pipeline
   * @param {PipeLineStage} stage
   * @returns {this}
   */
  public readonly insertStage = (stage: { [key: string]: any }) => {
    this.saveActionToDebugHistoryList('insertStage', stage);

    const stageError = this.isValidStage(stage);

    if (stageError) {
      this.forceLog('warn', stageError.message);
    }

    this.stageList.push({ ...stage, disableValidation: true });

    return this;
  };

  /**
   * Return the constructed pipeline
   */
  public readonly build = () => {
    this.saveActionToDebugHistoryList('build', {
      stageList: [...this.stageList], pagingStages: [...this.pagingStages],
    });

    const verified = this.verifyPipelineValidity(this.stageList);

    const pipeline = !this.pagingStages.length
      ? [...verified]
      : this.addPipelinePagingStages([...verified]);

    this.saveActionToDebugHistoryList('pipeline', pipeline);

    if (this.builderOptions.debug && this.debugActionList.length) {
      this.logDebuggedActions();
    }

    return pipeline;
  };

  // debug

  /**
   * Starts debug mode
   * @returns {this}
   */
  public readonly startDebug = () => {
    this.toggleDebug(true);
    return this;
  };

  /**
   * Stops debug mode
   * @returns {this}
   */
  public readonly stopDebug = () => {
    this.toggleDebug(false);
    return this;
  };

  /**
   * Logs the list of all actions stored in the debug action list
   */
  public readonly logDebuggedActions = () => {
    console.debug(`${this.pipelineName} debug:______________________________________________________________________________________`);
    this.debugActionList.forEach((action) => console.dir(action, { depth: null, colors: true }));
    console.debug('End_________________________________________________________________________________________');
    this.debugActionList = [];

    return this;
  };

  // stages

  /**
   * Adds the pipeline stages needed to paginate the results
   * @param {number} elementsPerPage the number of elements per page to display
   * @param {number} page the page to display
   * @returns {this}
   * @constructor
   */
  public readonly Paging = (elementsPerPage: number, page = 1): this => {
    this.saveActionToDebugHistoryList('Paging', { elementsPerPage, page });

    if (this.pagingStages.length) {
      throw new PipelineError('A Paging stage has already been added.');
    }

    this.checkPagingPipelineValidity();

    if (elementsPerPage < 1) {
      throw new PipelineError('You must specify at least 1 element per page.');
    }

    if (page < 1) {
      throw new PipelineError('The page 0 does not exist.');
    }

    this.pagingStages = [
      {
        $skip: (
          page - 1
        ) * elementsPerPage,
      },
      { $limit: elementsPerPage },
    ];

    this.saveActionToDebugHistoryList('pagingStages', this.pagingStages);

    return this;
  };

  /**
   * Adds new fields to documents. $addFields outputs documents that contain all existing fields from the input
   * documents and newly added fields.
   *
   * The $addFields stage is equivalent to a $project stage that explicitly specifies all existing fields in the input
   * documents and adds the new fields.
   *
   * @param {AddFieldsStage} values
   * @returns {this}
   * @constructor
   */
  public readonly AddFields = (...values: AddFieldsStage[]): this => {
    this.saveActionToDebugHistoryList('AddFields', values);

    return this.addStage(
      '$addFields',
      this.mergeObjectListToOneObject(values, 'AddFields'),
    );
  };

  /**
   * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket
   * @param {BucketStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Bucket = (value: BucketStage): this => {
    this.saveActionToDebugHistoryList('Bucket', value);

    return this.addStage('$bucket', value);
  };

  /**
   * Categorizes incoming documents into a specific number of groups, called buckets, based on a specified
   * expression.
   * Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the
   * specified number of buckets.
   * @param {BucketAutoStage} value
   * @returns {this}
   * @constructor
   */
  public readonly BucketAuto = (value: BucketAutoStage): this => {
    this.saveActionToDebugHistoryList('BucketAuto', value);

    return this.addStage('$bucketAuto', value);
  };

  /**
   * Returns a Change Stream cursor on a collection, a database, or an entire cluster. Must be used as the first stage
   * in an aggregation pipeline.
   * @param {ChangeStreamStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ChangeStream = (value: ChangeStreamStage): this => {
    this.saveActionToDebugHistoryList('ChangeStream', value);

    return this.addStage('$changeStream', value);
  };

  /**
   * If a change stream has large events that exceed 16 MB, a BSONObjectTooLarge exception is returned. Starting in
   * MongoDB 7.0, you can use a $changeStreamSplitLargeEvent stage to split the events into smaller fragments.
   *
   * You should only use $changeStreamSplitLargeEvent when strictly necessary. For example, if your application
   * requires full document pre- or post-images, and generates large events that exceed 16 MB, use
   * $changeStreamSplitLargeEvent.
   *
   * @param {ChangeStreamSplitLargeEventStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ChangeStreamSplitLargeEvent = (value: ChangeStreamSplitLargeEventStage): this => {
    this.saveActionToDebugHistoryList('ChangeStreamSplitLargeEvent', value);

    return this.addStage('$changeStreamSplitLargeEvent', value);
  };

  /**
   * Returns statistics regarding a collection or view.
   * @param {CollStatsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly CollStats = (value: CollStatsStage): this => {
    this.saveActionToDebugHistoryList('CollStats', value);

    return this.addStage('$collStats', value);
  };

  /**
   * Returns a count of the number of documents at this stage of the aggregation pipeline.
   * @param {string} value
   * @returns {this}
   * @constructor
   */
  public readonly Count = (value: string): this => {
    this.saveActionToDebugHistoryList('Count', value);

    return this.addStage('$count', value);
  };

  /**
   * Returns a stream of documents containing information on active and/or dormant operations as well as inactive
   * sessions that are holding locks as part of a transaction. The stage returns a document for each operation
   * or session
   * @param {CurrentOpStage} value
   * @returns {this}
   * @constructor
   */
  public readonly CurrentOp = (value: CurrentOpStage): this => {
    this.saveActionToDebugHistoryList('CurrentOp', value);

    return this.addStage('$currentOp', value);
  };

  /**
   * New in version 5.1.
   *
   * Creates new documents in a sequence of documents where certain values in a field are missing.
   *
   * You can use $densify to:
   *
   * Fill gaps in time series data.
   *
   * Add missing values between groups of data.
   *
   * Populate your data with a specified range of values.
   *
   * @param {DensifyStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Densify = (value: DensifyStage): this => {
    this.saveActionToDebugHistoryList('Densify', value);

    return this.addStage('$densify', value);
  };

  /**
   * Changed in version 5.1.
   *
   * Returns literal documents from input values.
   *
   * @param {DocumentsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Documents = (value: DocumentsStage): this => {
    this.saveActionToDebugHistoryList('Documents', value);

    return this.addStage('$documents', value);
  };

  /**
   * Processes multiple aggregation pipelines within a single stage on the same set of input documents. Enables the
   * creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a
   * single stage.
   *
   * @param {FacetStage} values
   * @returns {this}
   * @constructor
   */
  public readonly Facet = (...values: FacetStage[]): this => {
    this.saveActionToDebugHistoryList('Facet', values);

    return this.addStage(
      '$facet',
      this.mergeObjectListToOneObject(values, 'Facet'),
    );
  };

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
   * @param {FillStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Fill = (value: FillStage): this => {
    this.saveActionToDebugHistoryList('Fill', value);

    return this.addStage('$fill', value);
  };

  /**
   * Returns an ordered stream of documents based on the proximity to a geospatial point. Incorporates the
   * functionality of $match, $sort, and $limit for geospatial data. The output documents include an additional
   * distance field and can include a location identifier field.
   * @param {GeoNearStage} value
   * @returns {this}
   * @constructor
   */
  public readonly GeoNear = (value: GeoNearStage): this => {
    this.saveActionToDebugHistoryList('GeoNear', value);

    return this.addStage('$geoNear', value);
  };

  /**
   * Performs a recursive search on a collection. To each output document, adds a new array field that contains the
   * traversal results of the recursive search for that document.
   * @param {GraphLookupStage} value
   * @returns {this}
   * @constructor
   */
  public readonly GraphLookup = (value: GraphLookupStage): this => {
    this.saveActionToDebugHistoryList('GraphLookup', value);

    return this.addStage('$graphLookup', value);
  };

  /**
   * Groups input documents by a specified identifier expression and applies the accumulator expression(s), if
   * specified, to each group. Consumes all input documents and outputs one document per each distinct group. The
   * output documents only contain the identifier field and, if specified, accumulated fields.
   * @param {GroupStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Group = (value: GroupStage): this => {
    this.saveActionToDebugHistoryList('Group', value);

    return this.addStage('$group', value);
  };

  /**
   * Returns statistics regarding the use of each index for the collection.
   * @param {IndexStatsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly IndexStats = (value: IndexStatsStage): this => {
    this.saveActionToDebugHistoryList('IndexStats', value);

    return this.addStage('$indexStats', value);
  };

  /**
   * Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document,
   * outputs either one document (for the first n documents) or zero documents (after the first n documents).
   * @param {number} value
   * @returns {this}
   * @constructor
   */
  public readonly Limit = (value: number): this => {
    this.saveActionToDebugHistoryList('Limit', value);

    return this.addStage('$limit', value);
  };

  /**
   * Lists the sessions cached in memory by the mongod or mongos instance.
   * @param {ListSessionsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ListLocalSessions = (value: ListSessionsStage): this => {
    this.saveActionToDebugHistoryList('ListLocalSessions', value);

    return this.addStage('$listLocalSessions', value);
  };

  /**
   * Returns sampled queries for all collections or a specific collection. Sampled queries are used by the
   * analyzeShardKey command to calculate metrics about the read and write distribution of a shard key.
   * @param {ListSampledQueriesStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ListSampledQueries = (value: ListSampledQueriesStage): this => {
    this.saveActionToDebugHistoryList('ListSampledQueries', value);

    return this.addStage('$listSampledQueries', value);
  };

  /**
   * Returns information about existing Atlas Search indexes on a specified collection.
   * @param {ListSearchIndexesStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ListSearchIndexes = (value: ListSearchIndexesStage): this => {
    this.saveActionToDebugHistoryList('ListSearchIndexes', value);

    return this.addStage('$listSearchIndexes', value);
  };

  /**
   * Lists all sessions that have been active long enough to propagate to the system.sessions collection.
   * @param {ListSessionsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ListSessions = (value: ListSessionsStage): this => {
    this.saveActionToDebugHistoryList('ListSessions', value);

    return this.addStage('$listSessions', value);
  };

  /**
   * Performs a left outer join to an unSharded collection in the same database to filter in documents from the
   * “joined” collection for processing. To each input document, the $lookup stage adds a new array field whose
   * elements are the matching documents from the “joined” collection. The $lookup stage passes these reshaped
   * documents to the next stage.
   * @param {LookupStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Lookup = (value: LookupStage): this => {
    this.saveActionToDebugHistoryList('Lookup', value);

    return this.addStage('$lookup', value);
  };

  /**
   * Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline
   * stage.
   *
   * $match takes a document that specifies the query conditions. The query syntax is identical to the read operation
   * query syntax; i.e. $match does not accept raw aggregation expressions. Instead, use a $expr query expression to
   * include aggregation expression in $match.
   *
   * Pipeline Optimization
   * - Place the $match as early in the aggregation pipeline as possible. Because $match limits the total number of
   * documents in the aggregation pipeline, earlier $match operations minimize the amount of processing down the
   * pipe.
   * - If you place a $match at the very beginning of a pipeline, the query can take advantage of indexes like any
   * other db.collection.find() or db.collection.findOne().
   *
   * Restrictions
   * - The $match query syntax is identical to the read operation query syntax; i.e. $match does not accept raw
   * aggregation expressions. To include aggregation expression in $match, use a $expr query expression.
   *
   * @param {MatchStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Match = (value: MatchStage): this => {
    this.saveActionToDebugHistoryList('Match', value);

    return this.addStage('$match', value);
  };

  /**
   * Writes the resulting documents of the aggregation pipeline to a collection. The stage can incorporate (insert
   * new
   * documents, merge documents, replace documents, keep existing documents, fail the operation, process documents
   * with a custom update pipeline) the results into an output collection. To use the $merge stage, it must be the
   * last stage in the pipeline.
   *
   * @param {MergeStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Merge = (value: MergeStage): this => {
    this.saveActionToDebugHistoryList('Merge', value);

    return this.addStage('$merge', value);
  };

  /**
   * Writes the resulting documents of the aggregation pipeline to a collection. To use the $out stage, it must be the
   * last stage in the pipeline.
   *
   * @param {OutStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Out = (value: OutStage): this => {
    this.saveActionToDebugHistoryList('Out', value);

    return this.addStage('$out', value);
  };

  /**
   * Returns plan cache information for a collection.
   *
   * @param {PlanCacheStatsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly PlanCacheStats = (value: PlanCacheStatsStage): this => {
    this.saveActionToDebugHistoryList('PlanCacheStats', value);

    return this.addStage('$planCacheStats', value);
  };

  /**
   * Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can
   * be existing fields from the input documents or newly computed fields.
   *
   * @param {ProjectStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Project = (value: ProjectStage): this => {
    this.saveActionToDebugHistoryList('Project', value);

    return this.addStage('$project', value);
  };

  /**
   * Reshapes each document in the stream by restricting the content for each document based on information stored in
   * the documents themselves. Incorporates the functionality of $project and $match. Can be used to implement field
   * level redaction. For each input document, outputs either one or zero documents.
   *
   * @param {RedactStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Redact = (value: RedactStage): this => {
    this.saveActionToDebugHistoryList('Redact', value);

    return this.addStage('$redact', value);
  };

  /**
   * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
   * document, including the _id field. Specify a document embedded in the input document to promote the embedded
   * document to the top level.
   * $replaceWith is an alias for $replaceRoot stage.
   *
   * @param {ReplaceRootStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ReplaceRoot = (value: ReplaceRootStage): this => {
    this.saveActionToDebugHistoryList('ReplaceRoot', value);

    return this.addStage('$replaceRoot', value);
  };

  /**
   * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
   * document, including the _id field. Specify a document embedded in the input document to promote the embedded
   * document to the top level.
   * $replaceWith is an alias for $replaceRoot stage.
   *
   * @param {ReplaceWithStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ReplaceWith = (value: ReplaceWithStage): this => {
    this.saveActionToDebugHistoryList('ReplaceWith', value);

    return this.addStage('$replaceWith', value);
  };

  /**
   * Randomly selects the specified number of documents from its input.
   *
   * @param {number} value The size of samples
   * @returns {this}
   * @constructor
   */
  public readonly Sample = (value: number): this => {
    this.saveActionToDebugHistoryList('Sample', value);

    return this.addStage('$sample', SampleSizeHelper(value));
  };

  /**
   * Performs a full-text search of the field or fields in an Atlas collection.
   * $search is only available for MongoDB Atlas clusters, and is not available for self-managed deployments.
   *
   * @link https://docs.atlas.mongodb.com/reference/atlas-search/operators/
   *
   * @param {AtlasSearchStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Search = (value: AtlasSearchStage): this => {
    this.saveActionToDebugHistoryList('Search', value);

    return this.addStage('$search', value);
  };

  /**
   * searchMeta returns different types of metadata result documents for Atlas Search queries on the field or fields in
   * an Atlas collection. The fields must be covered by an Atlas Search index
   *
   * @param {AtlasSearchStage} value
   * @returns {this}
   * @constructor
   */
  public readonly SearchMeta = (value: AtlasSearchStage): this => {
    this.saveActionToDebugHistoryList('SearchMeta', value);

    return this.addStage('$searchMeta', value);
  };

  /**
   * Adds new fields to documents. Similar to $project, $set reshapes each document in the stream; specifically, by
   * adding new fields to output documents that contain both the existing fields from the input documents and the
   * newly added fields.
   * $set is an alias for $addFields stage.
   *
   * @param {SetStage} values
   * @returns {this}
   * @constructor
   */
  public readonly Set = (...values: SetStage[]): this => {
    this.saveActionToDebugHistoryList('Set', values);

    return this.addStage(
      '$set',
      this.mergeObjectListToOneObject(values, 'Set'),
    );
  };

  /**
   * New in version 5.0.
   *
   * Performs operations on a specified span of documents in a collection, known as a window, and returns the results
   * based on the chosen window operator.
   *
   * @param {SetWindowFieldsStage} value
   * @returns {this}
   * @constructor
   */
  public readonly SetWindowFields = (value: SetWindowFieldsStage): this => {
    this.saveActionToDebugHistoryList('SetWindowFields', value);

    return this.addStage('$setWindowFields', value);
  };

  /**
   * Returns information on the distribution of data in sharded collections.
   *
   * @param {ShardedDataDistributionStage} value
   * @returns {this}
   * @constructor
   */
  public readonly ShardedDataDistribution = (value: ShardedDataDistributionStage): this => {
    this.saveActionToDebugHistoryList('ShardedDataDistribution', value);

    return this.addStage('$shardedDataDistribution', value);
  };

  /**
   * Skips the first n documents where n is the specified skip number and passes the remaining documents unmodified to
   * the pipeline. For each input document, outputs either zero documents (for the first n documents) or one document
   * (if after the first n documents).
   *
   * @param {number} value
   * @returns {this}
   * @constructor
   */
  public readonly Skip = (value: number): this => {
    this.saveActionToDebugHistoryList('Skip', value);

    return this.addStage('$skip', value);
  };

  /**
   * Reorders the document stream by a specified sort key. Only the order changes; the documents remain unmodified.
   * For each input document, outputs one document.
   *
   * @param {SortStage} values
   * @returns {this}
   * @constructor
   */
  public readonly Sort = (...values: SortStage[]): this => {
    this.saveActionToDebugHistoryList('Sort', values);

    return this.addStage(
      '$sort',
      this.mergeObjectListToOneObject(values, 'sort'),
    );
  };

  /**
   * Groups incoming documents based on the value of a specified expression, then computes the count of documents in
   * each distinct group.
   *
   * @param {SortByCountStage} value
   * @returns {this}
   * @constructor
   */
  public readonly SortByCount = (value: SortByCountStage): this => {
    this.saveActionToDebugHistoryList('SortByCount', value);

    return this.addStage('$sortByCount', value);
  };

  /**
   * Performs a union of two collections; i.e. combines pipeline results from two collections into a single result
   * set.
   *
   * @param {UnionWithStage} value
   * @returns {this}
   * @constructor
   */
  public readonly UnionWith = (value: UnionWithStage): this => {
    this.saveActionToDebugHistoryList('UnionWith', value);

    return this.addStage('$unionWith', value);
  };

  /**
   * Removes/excludes fields from documents.
   * $unset is an alias for $project stage that removes fields.
   *
   * @param {UnsetStage} values
   * @returns {this}
   * @constructor
   */
  public readonly Unset = (...values: UnsetStage): this => {
    this.saveActionToDebugHistoryList('Unset', values);

    return this.addStage(
      '$unset',
      values.length > 1 ? values : values[0],
    );
  };

  /**
   * Deconstructs an array field from the input documents to output a document for each element. Each output document
   * replaces the array with an element value. For each input document, outputs n documents where n is the number of
   * array elements and can be zero for an empty array.
   *
   * @param {UnwindStage} value
   * @returns {this}
   * @constructor
   */
  public readonly Unwind = (value: UnwindStage): this => {
    this.saveActionToDebugHistoryList('Unwind', value);

    return this.addStage('$unwind', value);
  };

  // Utils

  /**
   * Adds a new stage to the pipeline
   *
   * @param {keyof PipeLineStage} stageType
   * @param stageValue
   * @returns {this}
   */
  private readonly addStage = (stageType: keyof PipeLineStage, stageValue: any) => {
    this.saveActionToDebugHistoryList('addStage', { stageType, stageValue });

    const stageToAdd: PipeLineStage = { [stageType]: stageValue };
    const validation = this.isValidStage(stageToAdd);

    if (validation) {
      throw new PipelineError(validation.message);
    }

    this.stageList.push(stageToAdd);

    return this;
  };

  /**
   * Adds pagination to pipeline
   *
   * @param pipelineToPaginate the pipeline whose results are to be paged
   * @returns the paging pipeline
   */
  private readonly addPipelinePagingStages = (pipelineToPaginate: PipeLineStage[]) => {
    this.saveActionToDebugHistoryList('addPipelinePagingStages', pipelineToPaginate);

    this.checkPagingPipelineValidity();

    return [
      {
        $facet: {
          docs: [...pipelineToPaginate, ...this.pagingStages],
          count: [...pipelineToPaginate, { $count: 'totalElements' }],
        } as FacetStage,
      },
    ] as PipeLineStage[];
  };

  /**
   * Checks the validity of the pipeline
   * @param pipelineBuilt The pipeline built
   */
  private readonly verifyPipelineValidity = (pipelineBuilt: (PipeLineStage & { disableValidation?: boolean })[]) => {
    if (!pipelineBuilt.length) {
      throw new PipelineError(`Error, ${this.pipelineName} pipeline is empty!`);
    }

    const isInvalidDuplicateStages = this.checkInvalidDuplicatedStages(pipelineBuilt);
    if (isInvalidDuplicateStages.length) {
      throw new PipelineError(
        `Error, ${this.pipelineName} pipeline contains invalid duplicated stages! ${isInvalidDuplicateStages.join(', ')}.`,
      );
    }

    this.stageErrorList = pipelineBuilt.map(
      s => !s.disableValidation ? this.isValidStage(s) : undefined,
    ).filter(error => error !== undefined) as PipelineStageError[];

    if (this.stageErrorList.length) {
      const errorMessage = this.stageErrorList.map(
        (e, i) => `${i + 1}) ${e.message}`,
      ).join('\n');

      this.log('error', errorMessage, 'stageErrorList:', this.stageErrorList);
      throw new PipelineError(errorMessage);
    }
    return pipelineBuilt.map(({ disableValidation, ...stage }) => stage) as PipeLineStage[];
  };

  /**
   * Checks non-duplicable stages in the pipeline
   * @param {(PipeLineStage & {disableValidation?: boolean})[]} pipelineBuilt
   * @returns {(keyof PipeLineStage)[]}
   */
  private readonly checkInvalidDuplicatedStages = (pipelineBuilt: (PipeLineStage & { disableValidation?: boolean })[]) => {
    return NON_DUPLICABLE_STAGE_LIST.filter(
      (nonDuplicableStage) => pipelineBuilt.filter((s) => Object.keys(s)[0] === nonDuplicableStage).length > 1,
    );
  };

  /**
   * Checks the validity of a paging pipeline
   */
  private readonly checkPagingPipelineValidity = () => {
    const skipStage = this.stageList.find(s => Object.keys(s)[0] === '$skip');
    const limitStage = this.stageList.find(s => Object.keys(s)[0] === '$limit');
    const countStage = this.stageList.find(s => Object.keys(s)[0] === '$count');

    if (skipStage || limitStage || countStage) {
      throw new PipelineError(
        'A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.');
    }
  };

  /**
   * Checks the validity of a stage
   * @param stageToValidate The stage to validate
   * @private
   */
  private readonly isValidStage = (stageToValidate: PipeLineStage): PipelineStageError | undefined => {
    const [stageType] = Object.keys(stageToValidate);
    const [stageValue] = Object.values(stageToValidate);

    if (!ValidPipelineStageNameList.includes(stageType)) {
      this.log('error', stageToValidate, { stageType, stageValue }, 'Unexpected stage name.');

      return { stageType, message: `Unexpected stage name. Received: ${stageType}` };
    }

    if (!stageValue) {
      this.log('error', stageToValidate, { stageType, stageValue }, 'The stage value is not valid.');

      return { stageType, message: `The ${stageType} stage value is not valid.` };
    }

    const validationMessage = this.validatePayload(stageType, stageValue);

    if (validationMessage !== 'VALID') {
      this.log('error', stageToValidate, { stageType, stageValue }, validationMessage);

      return { stageType, message: `Invalid ${stageType} stage value. ${validationMessage}` };
    }
  };

  /**
   * Checks the compliance of the stage payload
   * @param stageType
   * @param payload
   */
  private readonly validatePayload = (stageType: string, payload: any): string => {
    if (!STAGE_PAYLOAD_VALIDATORS_AVAILABLE[stageType]) {
      this.log(
        'warn',
        `No validator set for ${stageType} stage, cannot validate the payload. By default the stage is considered valid!`,
        payload,
      );

      return 'VALID';
    }

    return STAGE_PAYLOAD_VALIDATORS_AVAILABLE[stageType](payload);
  };

  /**
   * Enables / disables debugging mode
   * @param forceStatus Optional. Set debug status with this value if provided
   */
  private readonly toggleDebug = (forceStatus?: boolean) => {
    this.builderOptions.debug = forceStatus ?? !this.builderOptions.debug;

    return this;
  };

  /**
   * Save all actions in the history if debug mode is enabled
   * @param action The type of action to save
   * @param argList A list of information on the current state or the values that could have caused instability of the
   * builder
   * @private
   */
  private readonly saveActionToDebugHistoryList = (action: string, ...argList: any[]) => {
    if (!this.builderOptions.debug) {
      return;
    }

    this.debugActionList.push({ action, value: argList.length > 1 ? argList : argList[0] });
  };

  /**
   * Converts a list of objects to one
   * @param list
   * @param stageType
   * @constructor
   */
  private readonly mergeObjectListToOneObject = (list: { [key: string]: any }[], stageType: string) => {
    const invalidValueList = list.filter(v => {
      const isArray = Array.isArray(v);
      const isEmptyObject = !Object.keys(v).length;
      const hasInvalidValue = !Object.values(v)[0];
      return isArray || isEmptyObject || hasInvalidValue;
    });

    if (
      !Array.isArray(list) || invalidValueList.length
    ) {
      throw new PipelineError(
        invalidValueList.length > 1
          ? `${invalidValueList.length} fields of the ${stageType} stage are not valid.`
          : `The ${stageType} stage value is not valid.`,
      );
    }

    const objectToReturn: { [key: string]: any } = {};
    list.forEach((element) => {
      for (const key of Object.keys(element)) {
        objectToReturn[key] = element[key];
      }
    });
    return objectToReturn;
  };

  /**
   * Returns the current date in the expected format if specified. ISO by default.
   */
  private readonly getCurrentDate = () => {
    return new Date().toISOString();
  };

  /**
   * Displays the messages passed as parameters in the console
   * @param type The type of log to display
   * @param messageList Messages to display
   * @private
   */
  private readonly log = (type: 'info' | 'warn' | 'error', ...messageList: any[]) => {
    if (!this.builderOptions.logs) {
      return;
    }

    console[type](`${this.getCurrentDate()} - ${type}:`);
    messageList.forEach((message) => console.dir(message, { depth: null, colors: true }));
  };

  /**
   * Enables and logs even if logs are disabled
   * @param {"info" | "warn" | "error"} type
   * @param messageList
   */
  private readonly forceLog = (type: 'warn' | 'error', ...messageList: any[]) => {
    const previousLogState = this.builderOptions.logs;
    this.builderOptions.logs = true;
    this.log(type, ...messageList);
    this.builderOptions.logs = previousLogState;
  };
}
