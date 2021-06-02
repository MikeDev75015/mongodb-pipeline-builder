/* tslint:disable:no-trailing-whitespace */
import {
    BucketAutoStageInterface,
    BucketStageInterface,
    BuilderOptionsInterface,
    CollStatsStageInterface,
    DebugBuildInterface,
    GeoNearStageInterface,
    getStageTypeValue,
    GraphLookupStageInterface,
    GroupStageInterface,
    InitOptionsInterface,
    LookupStageInterface,
    MergeStageInterface,
    OutStageInterface,
    ReplaceRootStageInterface,
    SampleStageInterface,
    StageErrorInterface,
    StageInterface,
    StageLabel,
    UnionWithStageInterface,
    UnwindStageInterface,
} from "./interfaces";
import {PipelineError} from "./errors";
import {PAYLOAD_VALIDATION_ENABLED} from "./constants";
import {IsValidName} from "./decorators";

/**
 * The class of the pipeline builder object
 */
export class PipelineBuilder {

    /**
     * Static variable that counts the number of instances created
     * @private
     */
    private static counter = 0;

    /**
     * Default builder options
     * @private
     */
    private readonly defaultOptions: BuilderOptionsInterface = {
        debug: false,
        logs: false
    };

    /**
     * Contains the name of the pipeline
     * @private
     */
    @IsValidName({
        minLength: 4,
        maxLength: 12,
        noSpace: true,
        noSpecialChar: true
    })
    private readonly pipelineName: string;

    /**
     * Contains debug status and information saved at each step
     * @private
     */
    private readonly debugBuild: DebugBuildInterface;

    /**
     * A boolean allowing to display or not the logs
     * @private
     */
    private readonly logs: boolean;

    /**
     * Contains the list of pipeline stages that have been added
     * @private
     */
    private stageList: StageInterface[];

    /**
     * Contains the list of errors returned by the pipeline validator
     * @private
     */
    private stageErrorList: StageErrorInterface[];

    /**
     * Contains all active payload validators
     * @private
     */
    private readonly stageValidatorsBundle: { [key: string]: any };

    /**
     * Contains the $skip and $limit stages for pagination
     * @private
     */
    private pagingStage: StageInterface[];

    /**
     * constructor
     * @param pipelineName The name of the pipeline
     * @param options
     */
    constructor(
        pipelineName: string,
        options: InitOptionsInterface = {}
    ) {
        PipelineBuilder.counter++;
        const setOptions: BuilderOptionsInterface = {
            ...this.defaultOptions,
            ...options
        };

        this.pipelineName = `${pipelineName}_${PipelineBuilder.counter}`;
        this.debugBuild = { status: setOptions.debug, actionList: [] };
        this.logs = setOptions.logs;
        this.stageValidatorsBundle = PAYLOAD_VALIDATION_ENABLED;
        this.stageErrorList = [];
        this.stageList = [];
        this.pagingStage = [];

        this.saveActionToDebugHistoryList(
            'constructor',
            {
                pipelineName: this.pipelineName,
                counter: PipelineBuilder.counter,
                options
            }, { debugBuild: this.debugBuild }
        );
    }

    // basics
    /**
     * Adds a new stage to the pipeline
     * @param stageTypeLabel the type of stage
     * @param stageValue the value of the stage
     * @returns the builder allowing to chain the methods
     */
    public readonly addStage = (stageTypeLabel: StageLabel, stageValue: any) => {
        const payloadError = this.validatePayload(stageTypeLabel, stageValue);
        if (
            (!stageValue || payloadError) &&
            this.debugBuild.status
        ) {
            const errorMessage = !stageValue
                ? `The ${stageTypeLabel} stage value is not valid.`
                : payloadError;
            throw new PipelineError(errorMessage);
        }

        this.stageList.push({
            [getStageTypeValue(stageTypeLabel)]: stageValue
        });

        this.saveActionToDebugHistoryList('addStage', { stageTypeLabel, stageValue: JSON.stringify(stageValue) });
        return this;
    }

    /**
     * Returns the name of the pipeline
     */
    public readonly getName = () => {
        this.saveActionToDebugHistoryList('getName');
        return this.pipelineName;
    }

    /**
     * Return the constructed pipeline
     */
    public readonly getPipeline = () => {
        this.saveActionToDebugHistoryList('getPipeline');
        return !this.pagingStage.length
            ? this.verifyPipelineValidity([...this.stageList])
            : this.paginatePipelineResults(this.verifyPipelineValidity([...this.stageList]));
    }

    /**
     * Reset the pipeline
     */
    public readonly resetPipeline = () => {
        this.stageList = [];
        this.saveActionToDebugHistoryList('resetPipeline');
        return this.stageList;
    }


    // tools
    /**
     * Enable debug mode
     */
    public readonly enableDebug = () => {
        return this.toggleDebug(true);
    }

    /**
     * Disable debug mode
     */
    public readonly disableDebug = () => {
        return this.toggleDebug(false);
    }

    /**
     * Get the list of all actions stored in the debug history list
     */
    public readonly getDebugActionList = () => {
        this.log('info', 'getDebugActionList', this.debugBuild.actionList);
        return this.debugBuild.actionList;
    }

    // stages
    /**
     * Adds the pipeline stages needed to paginate the results
     * @param elementsPerPage the number of elements per page to display
     * @param page the page to display
     * @constructor
     */
    public Paging(elementsPerPage: number, page = 1): this {
        if (this.pagingStage.length) {
            throw new PipelineError('A Paging stage has already been added.');
        }

        const skipStage = this.stageList.find(s => Object.keys(s)[0] === '$skip');
        const limitStage = this.stageList.find(s => Object.keys(s)[0] === '$limit');
        const countStage = this.stageList.find(s => Object.keys(s)[0] === '$count');
        if (skipStage || limitStage || countStage) {
            throw new PipelineError('A Paging stage cannot be added if a Skip, Limit, or Count stage is already in the pipeline.');
        }

        if (elementsPerPage < 1) {
            throw new PipelineError('You must specify at least 1 element per page.');
        }

        if (page < 1) {
            throw new PipelineError('The page you are looking for does not exist.');
        }

        page -= 1;
        this.pagingStage = [
            { $skip: page * elementsPerPage },
            { $limit: elementsPerPage }
        ];

        return this;
    }

    /**
     * Adds new fields to documents
     *
     * @param value one or more Field helper
     * @constructor
     */
    public AddFields(...value: { [key: string]: any }[]): this {
        return this.addStage(
            'addFields',
            this.ToObject(value, 'AddFields')
        );
    }
    /**
     * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket
     * boundaries.
     * @param value
     * @constructor
     */
    public Bucket(value: BucketStageInterface): this {
        return this.addStage('bucket', value);
    }
    /**
     * Categorizes incoming documents into a specific number of groups, called buckets, based on a specified expression.
     * Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the specified
     * number of buckets.
     * @param value
     * @constructor
     */
    public BucketAuto(value: BucketAutoStageInterface): this {
        return this.addStage('bucketAuto', value);
    }

    /**
     * Returns statistics regarding a collection or view.
     * @param value
     * @constructor
     */
    public CollStats(value: CollStatsStageInterface): this {
        return this.addStage('collStats', value);
    }

    /**
     * Returns a count of the number of documents at this stage of the aggregation pipeline.
     * @param value
     * @constructor
     */
    public Count(value: string): this {
        return this.addStage('count', value);
    }
    /**
     * Processes multiple aggregation pipelines within a single stage on the same set of input documents. Enables the
     * creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a
     * single stage.
     * @param value
     * @constructor
     */
    public Facet(...value: { [key: string]: StageInterface[] }[]): this {
      console.log('Facet value', value);
        return this.addStage(
            'facet',
            this.ToObject(value, 'Facet')
        );
    }

    /**
     * Returns an ordered stream of documents based on the proximity to a geospatial point. Incorporates the functionality
     * of $match, $sort, and $limit for geospatial data. The output documents include an additional distance field and can
     * include a location identifier field.
     * @param value
     * @constructor
     */
    public GeoNear(value: GeoNearStageInterface): this {
        return this.addStage('geoNear', value);
    }

    /**
     * Performs a recursive search on a collection. To each output document, adds a new array field that contains the
     * traversal results of the recursive search for that document.
     * @param value
     * @constructor
     */
    public GraphLookup(value: GraphLookupStageInterface): this {
        return this.addStage('graphLookup', value);
    }

    /**
     * Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified,
     * to each group. Consumes all input documents and outputs one document per each distinct group. The output documents
     * only contain the identifier field and, if specified, accumulated fields.
     * @param value
     * @constructor
     */
    public Group(value: GroupStageInterface): this {
        return this.addStage('group', value);
    }

    /**
     * Returns statistics regarding the use of each index for the collection.
     * @param value
     * @constructor
     */
    public IndexStats(value: any): this {
        return this.addStage('indexStats', value);
    }

    /**
     * Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document,
     * outputs either one document (for the first n documents) or zero documents (after the first n documents).
     * @param value
     * @constructor
     */
    public Limit(value: number): this {
        return this.addStage('limit', value);
    }

    /**
     * Lists all sessions that have been active long enough to propagate to the system.sessions collection.
     * @param value
     * @constructor
     */
    public ListSessions(value: any): this {
        return this.addStage('listSessions', value);
    }

    /**
     * Performs a left outer join to an unSharded collection in the same database to filter in documents from the “joined”
     * collection for processing. To each input document, the $lookup stage adds a new array field whose elements are the
     * matching documents from the “joined” collection. The $lookup stage passes these reshaped documents to the next stage.
     *
     * @param value
     * @constructor
     */
    public Lookup(value: LookupStageInterface): this {
        return this.addStage('lookup', value);
    }

    /**
     * Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
     *
     * $match takes a document that specifies the query conditions. The query syntax is identical to the read operation
     * query syntax; i.e. $match does not accept raw aggregation expressions. Instead, use a $expr query expression to
     * include aggregation expression in $match.
     *
     * Pipeline Optimization
     * - Place the $match as early in the aggregation pipeline as possible. Because $match limits the total number of
     * documents in the aggregation pipeline, earlier $match operations minimize the amount of processing down the pipe.
     * - If you place a $match at the very beginning of a pipeline, the query can take advantage of indexes like any other
     * db.collection.find() or db.collection.findOne().
     *
     * Restrictions
     * - The $match query syntax is identical to the read operation query syntax; i.e. $match does not accept raw
     * aggregation expressions. To include aggregation expression in $match, use a $expr query expression.
     *
     * @param value
     * @constructor
     */
    public Match(value: any): this {
        return this.addStage('match', value);
    }

    /**
     * Writes the resulting documents of the aggregation pipeline to a collection. The stage can incorporate (insert new
     * documents, merge documents, replace documents, keep existing documents, fail the operation, process documents with
     * a custom update pipeline) the results into an output collection. To use the $merge stage, it must be the last stage
     * in the pipeline.
     * @param value
     * @constructor
     */
    public Merge(value: MergeStageInterface): this {
        return this.addStage('merge', value);
    }

    /**
     * Writes the resulting documents of the aggregation pipeline to a collection. To use the $out stage, it must be the
     * last stage in the pipeline.
     * @param value
     * @constructor
     */
    public Out(value: OutStageInterface): this {
        return this.addStage('out', value);
    }

    /**
     * Returns plan cache information for a collection.
     * @param value
     * @constructor
     */
    public PlanCacheStats(value: any): this {
        return this.addStage('planCacheStats', value);
    }

    /**
     * Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be
     * existing fields from the input documents or newly computed fields.
     *
     * @param value Include OR Exclude Existing Fields
     * documents, you must explicitly specify the suppression of the _id field in $project by passing false.
     * @constructor
     */
    public Project(value: { [key: string]: any }): this {
        return this.addStage('project', value);
    }

    /**
     * Reshapes each document in the stream by restricting the content for each document based on information stored in
     * the documents themselves. Incorporates the functionality of $project and $match. Can be used to implement field
     * level redaction. For each input document, outputs either one or zero documents.
     * @param value
     * @constructor
     */
    public Redact(value: any): this {
        return this.addStage('redact', value);
    }

    /**
     * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
     * document, including the _id field. Specify a document embedded in the input document to promote the embedded
     * document to the top level.
     * $replaceWith is an alias for $replaceRoot stage.
     * @param value
     * @constructor
     */
    public ReplaceRoot(value: ReplaceRootStageInterface): this {
        return this.addStage('replaceRoot', value);
    }

    /**
     * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
     * document, including the _id field. Specify a document embedded in the input document to promote the embedded
     * document to the top level.
     * $replaceWith is an alias for $replaceRoot stage.
     * @param value
     * @constructor
     */
    public ReplaceWith(value: any): this {
        return this.addStage('replaceWith', value);
    }

    /**
     * Randomly selects the specified number of documents from its input.
     * @param value
     * @constructor
     */
    public Sample(value: SampleStageInterface): this {
        return this.addStage('sample', value);
    }

    /**
     * Performs a full-text search of the field or fields in an Atlas collection.
     * $search is only available for MongoDB Atlas clusters, and is not available for self-managed deployments.
     *
     * https://docs.atlas.mongodb.com/reference/atlas-search/operators/
     *
     * @param value
     * @constructor
     */
    public Search(value: any): this {
        return this.addStage('search', value);
    }

    /**
     * Adds new fields to documents. Similar to $project, $set reshapes each document in the stream; specifically, by
     * adding new fields to output documents that contain both the existing fields from the input documents and the
     * newly added fields.
     * $set is an alias for $addFields stage.
     * @param value
     * @constructor
     */
    public Set(...value: { [key: string]: any }[]): this {
        return this.addStage(
            'set',
            this.ToObject(value, 'Set')
        );
    }

    /**
     * Skips the first n documents where n is the specified skip number and passes the remaining documents unmodified to
     * the pipeline. For each input document, outputs either zero documents (for the first n documents) or one document
     * (if after the first n documents).
     * @param value
     * @constructor
     */
    public Skip(value: number): this {
        return this.addStage('skip', value);
    }

    /**
     * Reorders the document stream by a specified sort key. Only the order changes; the documents remain unmodified.
     * For each input document, outputs one document.
     * @param value
     * @constructor
     */
    public Sort(...value: { [key: string]: any }[]): this {
        return this.addStage(
            'sort',
            this.ToObject(value, 'Sort')
        );
    }

    /**
     * Groups incoming documents based on the value of a specified expression, then computes the count of documents in
     * each distinct group.
     * @param value
     * @constructor
     */
    public SortByCount (value: any): this {
        return this.addStage('sortByCount', value);
    }

    /**
     * Performs a union of two collections; i.e. combines pipeline results from two collections into a single result
     * set.
     * @param value
     * @constructor
     */
    public UnionWith(value: UnionWithStageInterface): this {
        return this.addStage('unionWith', value);
    }

    /**
     * Removes/excludes fields from documents.
     * $unset is an alias for $project stage that removes fields.
     * @param value
     * @constructor
     */
    public Unset(...value: string[]): this {
        return this.addStage(
            'unset',
            value.length > 1 ? value : value[0]
        );
    }

    /**
     * Deconstructs an array field from the input documents to output a document for each element. Each output document
     * replaces the array with an element value. For each input document, outputs n documents where n is the number of
     * array elements and can be zero for an empty array.
     * @param value
     * @constructor
     */
    public Unwind(value: string | UnwindStageInterface): this {
        return this.addStage('unwind', value);
    }

    /**
     * Check the validity of the pipeline
     * @param pipelineBuilt The pipeline built
     */
    private readonly verifyPipelineValidity = (pipelineBuilt: StageInterface[]) => {
        this.log('info', `verifyPipelineValidity of ${this.pipelineName} pipeline:\n`, JSON.stringify(this.stageList));
        if (!pipelineBuilt.length) {
            throw new PipelineError(`Error, ${this.pipelineName} pipeline is empty!`);
        }

        this.stageErrorList = pipelineBuilt.map(
            s => this.isValidStage(s)
        ).filter(error => error) as StageErrorInterface[];

        if (this.stageErrorList.length) {
            const errorMessage = this.stageErrorList.map(
                (e, i) => `${i + 1}) ${e.message}`
            ).join('\n');
            this.log('error', errorMessage, 'stageErrorList', this.stageErrorList);

            this.saveActionToDebugHistoryList('stageErrorList', { errorMessage });
            throw new PipelineError(errorMessage);
        }
        return pipelineBuilt;
    }

    /**
     * Check the validity of a stage
     * @param stageToValidate The stage to validate
     * @private
     */
    private readonly isValidStage = (stageToValidate: StageInterface) => {
        const stageType: string = Object.keys(stageToValidate)[0].substr(1);
        const stageValue: any = Object.values(stageToValidate)[0];
        const payloadError = this.validatePayload(stageType, stageValue);

        if (!stageValue || payloadError) {
            const errorMessage = !stageValue
                ? `The ${stageType} stage value is not valid.`
                : payloadError;

            this.saveActionToDebugHistoryList(
                'Stage Error',
                { message: errorMessage },
                stageType,
                { invalidStage: JSON.stringify(stageToValidate) }
            );
            return {
                stageType,
                message: errorMessage
            };
        }

        return null;
    }

    /**
     * Checks the compliance of the stage payload
     * @param stageType
     * @param payload
     */
    private readonly validatePayload = (stageType: string, payload: any) => {
        return this.stageValidatorsBundle[stageType](payload);
    }

    /**
     * Allows pagination of pipeline results
     * @param pipelineToPaginate the pipeline whose results are to be paged
     * @returns the paging pipeline
     */
    private readonly paginatePipelineResults = (pipelineToPaginate: StageInterface[]) => {
        return [
            {
                $facet: {
                    docs: [ ...pipelineToPaginate, ...this.pagingStage ],
                    count: [ ...pipelineToPaginate, { $count: 'totalElements'}]
                }
            }
        ];
    }

    /**
     * Enables / disables debugging mode
     * @param debugBuildStatus
     */
    private readonly toggleDebug = (debugBuildStatus: boolean) => {
        this.debugBuild.status = debugBuildStatus;
        this.saveActionToDebugHistoryList('toggleDebug', { debugBuildStatus });
        return this;
    }

    /**
     * Save all actions in the history if debug mode is enabled
     * @param action The type of action to save
     * @param argList A list of information on the current state or the values that could have caused instability of the
     * builder
     * @private
     */
    private readonly saveActionToDebugHistoryList = (action: string, ...argList: any[]) => {
        if (!this.debugBuild.status) {
            return;
        }

        const historyBundle: {
            date: any;
            action: any;
            pipeline: any;
            value?: any;
        } = { date: this.getCurrentDate(), action: `${this.pipelineName} => ${action}`, pipeline: [...this.stageList] };

        if (argList && argList.length) {
            historyBundle.value = JSON.stringify(argList.length > 1? argList : argList[0]);
        }

        this.debugBuild.actionList.push(historyBundle);
        this.log('info', 'saveToDebugActionList', historyBundle);
    }

    // Utils
    /**
     * Converts a list of objects to one
     * @param list
     * @param stageType
     * @constructor
     */
    private readonly ToObject = (list: { [key: string]: any }[], stageType: string) => {
        const invalidValueList = list.filter(v => {
            const isArray = Array.isArray(v);
            const isEmptyObject = !Object.keys(v).length;
            const hasInvalidValue = !Object.values(v)[0]
            return isArray || isEmptyObject || hasInvalidValue;
        });

        if (
            !Array.isArray(list) || invalidValueList.length
        ) {
            throw new PipelineError(
                invalidValueList.length > 1
                    ? `${invalidValueList.length} fields of the ${stageType} stage are not valid.`
                    : `The ${stageType} stage value is not valid.`
            );
        }

        const objectToReturn: { [key: string]: any } = {};
        list.forEach((element) => {
          for (const key of Object.keys(element)) {
            objectToReturn[key] = element[key];
          }
        });
        return objectToReturn;
    }

    /**
     * Returns the current date in the expected format if specified. ISO by default.
     */
    private readonly getCurrentDate = () => {
        return new Date().toISOString();
    }

    /**
     * Displays the messages passed as parameters in the console
     * @param type The type of log to display
     * @param messageList Messages to display
     * @private
     */
    private readonly log = (type: 'info' | 'warn' | 'error', ...messageList: any[]) => {
        if (this.logs) {
            console[type](`${this.getCurrentDate()} - ${this.pipelineName}:\n`, ...messageList);
        }
    }
}
