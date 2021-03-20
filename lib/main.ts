import {
    DebugBuildInterface,
    StageErrorInterface,
    StageInterface,
    getStageTypeValue,
    StageLabel
} from "./interfaces";
import { BucketStageInterface } from "./interfaces/stages";
import {DATE_FORMAT, PAYLOAD_VALIDATION_ENABLED} from "./constants";
import { PipelineError } from "./errors";
import { LOGS_ENABLED, APP_TIMEZONE } from './';
import {validLookupPayload} from "./helpers/lookup";

/**
 * The moment.js library for formatting dates
 */
const moment = require('moment-timezone');

/**
 * The class of the pipeline builder object
 */
export class PipelineBuilder {
    /**
     * Contains the name of the pipeline
     * @private
     */
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
    private readonly logsEnabled: boolean;
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
     * constructor
     * @param pipelineName The name of the pipeline
     * @param logsEnabled Activation of logs or not
     * @param debug Activation of debug or not
     */
    constructor(
        pipelineName: string,
        debug = false,
        logsEnabled = false
    ) {
        this.pipelineName = pipelineName;
        this.debugBuild = { status: debug, historyList: [] };
        this.logsEnabled = logsEnabled ? true : (LOGS_ENABLED === 'true');
        this.stageList = [];
        this.stageErrorList = [];
        this.stageValidatorsBundle = {
            lookup: validLookupPayload
        };

        this.saveActionToDebugHistoryList('constructor', { debug }, { logsEnabled }, { debugBuild: this.debugBuild });
    }

    /**
     * Returns the name of the pipeline
     */
    public readonly getName = () => {
        this.saveActionToDebugHistoryList('getName');
        return this.pipelineName;
    }
    /**
     * Enable debug mode
     */
    public readonly enableDebug = () => this.toggleDebug(true);
    /**
     * Disable debug mode
     */
    public readonly disableDebug = () => this.toggleDebug(false);
    /**
     * Get the list of all actions stored in the debug history list
     */
    public readonly getDebugActionList = () => {
        this.log('info', 'getDebugActionList', this.debugBuild.historyList);
        return this.debugBuild.historyList;
    }
    /**
     * Reset the pipeline
     */
    public readonly resetPipeline = () => {
        this.stageList = [];
        this.saveActionToDebugHistoryList('resetPipeline');
        return this.stageList;
    }

    /**
     * Adds new fields to documents. Similar to $project, $addFields reshapes each document in the stream; specifically,
     * by adding new fields to output documents that contain both the existing fields from the input documents and the
     * newly added fields.
     * $set is an alias for $addFields.
     * @param value
     * @constructor
     */
    public readonly AddFields = (value: { [key: string]: any }) => this.addStage('addFields', value);
    /**
     * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket
     * boundaries.
     * @param value
     * @constructor
     */
    public readonly Bucket = (value: BucketStageInterface) => this.addStage('bucket', value);
    /**
     * Categorizes incoming documents into a specific number of groups, called buckets, based on a specified expression.
     * Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the specified
     * number of buckets.
     * @param value
     * @constructor
     */
    public readonly BucketAuto = (value: any) => this.addStage('bucketAuto', value);
    /**
     * Returns statistics regarding a collection or view.
     * @param value
     * @constructor
     */
    public readonly CollStats = (value: any) => this.addStage('collStats', value);
    /**
     * Returns a count of the number of documents at this stage of the aggregation pipeline.
     * @param value
     * @constructor
     */
    public readonly Count = (value: any) => this.addStage('count', value);
    /**
     * Processes multiple aggregation pipelines within a single stage on the same set of input documents. Enables the
     * creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a
     * single stage.
     * @param value
     * @constructor
     */
    public readonly Facet = (value: any) => this.addStage('facet', value);
    /**
     * Returns an ordered stream of documents based on the proximity to a geospatial point. Incorporates the functionality
     * of $match, $sort, and $limit for geospatial data. The output documents include an additional distance field and can
     * include a location identifier field.
     * @param value
     * @constructor
     */
    public readonly GeoNear = (value: any) => this.addStage('geoNear', value);
    /**
     * Performs a recursive search on a collection. To each output document, adds a new array field that contains the
     * traversal results of the recursive search for that document.
     * @param value
     * @constructor
     */
    public readonly GraphLookup = (value: any) => this.addStage('graphLookup', value);
    /**
     * Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified,
     * to each group. Consumes all input documents and outputs one document per each distinct group. The output documents
     * only contain the identifier field and, if specified, accumulated fields.
     * @param value
     * @constructor
     */
    public readonly Group = (value: any) => this.addStage('group', value);
    /**
     * Returns statistics regarding the use of each index for the collection.
     * @param value
     * @constructor
     */
    public readonly IndexStats = (value: any) => this.addStage('indexStats', value);
    /**
     * Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document,
     * outputs either one document (for the first n documents) or zero documents (after the first n documents).
     * @param value
     * @constructor
     */
    public readonly Limit = (value: any) => this.addStage('limit', value);
    /**
     * Lists all sessions that have been active long enough to propagate to the system.sessions collection.
     * @param value
     * @constructor
     */
    public readonly ListSessions = (value: any) => this.addStage('listSessions', value);
    /**
     * Performs a left outer join to an unSharded collection in the same database to filter in documents from the “joined”
     * collection for processing. To each input document, the $lookup stage adds a new array field whose elements are the
     * matching documents from the “joined” collection. The $lookup stage passes these reshaped documents to the next stage.
     *
     * @param value
     * @constructor
     */
    public readonly Lookup = (value: any) => this.addStage('lookup', value);
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
    public readonly Match = (value: any) => this.addStage('match', value);
    /**
     * Writes the resulting documents of the aggregation pipeline to a collection. The stage can incorporate (insert new
     * documents, merge documents, replace documents, keep existing documents, fail the operation, process documents with
     * a custom update pipeline) the results into an output collection. To use the $merge stage, it must be the last stage
     * in the pipeline.
     * @param value
     * @constructor
     */
    public readonly Merge = (value: any) => this.addStage('merge', value);
    /**
     * Writes the resulting documents of the aggregation pipeline to a collection. To use the $out stage, it must be the
     * last stage in the pipeline.
     * @param value
     * @constructor
     */
    public readonly Out = (value: any) => this.addStage('out', value);
    /**
     * Returns plan cache information for a collection.
     * @param value
     * @constructor
     */
    public readonly PlanCacheStats = (value: any) => this.addStage('planCacheStats', value);
    /**
     * Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be
     * existing fields from the input documents or newly computed fields.
     *
     * @param value Include OR Exclude Existing Fields
     * documents, you must explicitly specify the suppression of the _id field in $project by passing false.
     * @constructor
     */
    public readonly Project = (value: any) => this.addStage('project', value);
    /**
     * Reshapes each document in the stream by restricting the content for each document based on information stored in
     * the documents themselves. Incorporates the functionality of $project and $match. Can be used to implement field
     * level redaction. For each input document, outputs either one or zero documents.
     * @param value
     * @constructor
     */
    public readonly Redact = (value: any) => this.addStage('redact', value);
    /**
     * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
     * document, including the _id field. Specify a document embedded in the input document to promote the embedded
     * document to the top level.
     * $replaceWith is an alias for $replaceRoot stage.
     * @param value
     * @constructor
     */
    public readonly ReplaceRoot = (value: any) => this.addStage('replaceRoot', value);
    /**
     * Replaces a document with the specified embedded document. The operation replaces all existing fields in the input
     * document, including the _id field. Specify a document embedded in the input document to promote the embedded
     * document to the top level.
     * $replaceWith is an alias for $replaceRoot stage.
     * @param value
     * @constructor
     */
    public readonly ReplaceWith = (value: any) => this.addStage('replaceWith', value);
    /**
     * Randomly selects the specified number of documents from its input.
     * @param value
     * @constructor
     */
    public readonly Sample = (value: any) => this.addStage('sample', value);
    /**
     * Performs a full-text search of the field or fields in an Atlas collection.
     * $search is only available for MongoDB Atlas clusters, and is not available for self-managed deployments.
     * @param value
     * @constructor
     */
    public readonly Search = (value: any) => this.addStage('search', value);
    /**
     * Adds new fields to documents. Similar to $project, $set reshapes each document in the stream; specifically, by
     * adding new fields to output documents that contain both the existing fields from the input documents and the
     * newly added fields.
     * $set is an alias for $addFields stage.
     * @param value
     * @constructor
     */
    public readonly Set = (value: any) => this.addStage('set', value);
    /**
     * Skips the first n documents where n is the specified skip number and passes the remaining documents unmodified to
     * the pipeline. For each input document, outputs either zero documents (for the first n documents) or one document
     * (if after the first n documents).
     * @param value
     * @constructor
     */
    public readonly Skip = (value: any) => this.addStage('skip', value);
    /**
     * Reorders the document stream by a specified sort key. Only the order changes; the documents remain unmodified.
     * For each input document, outputs one document.
     * @param value
     * @constructor
     */
    public readonly Sort = (value: any) => this.addStage('sort', value);
    /**
     * Groups incoming documents based on the value of a specified expression, then computes the count of documents in
     * each distinct group.
     * @param value
     * @constructor
     */
    public readonly SortByCount = (value: any) => this.addStage('sortByCount', value);
    /**
     * Performs a union of two collections; i.e. combines pipeline results from two collections into a single result
     * set.
     * @param value
     * @constructor
     */
    public readonly UnionWith = (value: any) => this.addStage('unionWith', value);
    /**
     * Removes/excludes fields from documents.
     * $unset is an alias for $project stage that removes fields.
     * @param value
     * @constructor
     */
    public readonly Unset = (value: string[]) => this.addStage('unset', value);
    /**
     * Deconstructs an array field from the input documents to output a document for each element. Each output document
     * replaces the array with an element value. For each input document, outputs n documents where n is the number of
     * array elements and can be zero for an empty array.
     * @param value
     * @constructor
     */
    public readonly Unwind = (value: any) => this.addStage('unwind', value);

    /**
     * Return the constructed pipeline
     */
    public readonly getPipeline = () => {
        this.saveActionToDebugHistoryList('getPipeline');
        return this.verifyPipelineValidity([...this.stageList]);
    }

    /**
     * Save all actions in the history if debug mode is enabled
     * @param action The type of action to save
     * @param argList A list of information on the current state or the values that could have caused instability of the
     * builder
     * @private
     */
    private saveActionToDebugHistoryList(action: string, ...argList: any[]): void {
        if (!this.debugBuild.status) {
            return;
        }

        const historyBundle: {
            date: any;
            action: any;
            pipeline: any;
            value?: any;
        } = { date: this.getCurrentDate(), action: `${this.pipelineName} => ${action}`, pipeline: this.stageList };

        if (argList && argList.length) {
            historyBundle.value = JSON.stringify(argList.length > 1? argList : argList[0]);
        }

        this.debugBuild.historyList.push(historyBundle);
        this.log('info', 'saveToDebugActionList', historyBundle);
    }

    /**
     * toggleDebug
     * @param debugBuildStatus
     */
    private readonly toggleDebug = (debugBuildStatus: boolean) => {
        this.debugBuild.status = debugBuildStatus;
        this.saveActionToDebugHistoryList('toggleDebug', { debugBuildStatus });
        return debugBuildStatus;
    }

    /**
     * Adds a new stage to the pipeline
     * @param stageTypeLabel the type of stage
     * @param stageValue the value of the stage
     * @returns the builder allowing to chain the methods
     */
    private readonly addStage = (stageTypeLabel: StageLabel, stageValue: any) => {
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

        this.stageList.push(
            this.createObject(getStageTypeValue(stageTypeLabel), stageValue)
        );

        this.saveActionToDebugHistoryList('addStage', { stageTypeLabel, stageValue: JSON.stringify(stageValue) });
        return this;
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
    private isValidStage(stageToValidate: StageInterface): null | StageErrorInterface {
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
        if (!PAYLOAD_VALIDATION_ENABLED.includes(stageType)) {
            return '';
        }

        return this.stageValidatorsBundle[stageType](payload);
    }

    // Utils
    /**
     * Creates a new javascript object
     * @param key The key
     * @param value The value
     */
    private readonly createObject = (key: string, value: any) => {
        const object: {[index: string]: any} = {};
        object[key] = value;
        return object;
    }

    /**
     * Returns the current date in the expected format if specified. ISO by default.
     * @param type Default to ISO
     */
    private readonly getCurrentDate = (type = 'ISO') => {
        return moment().tz(APP_TIMEZONE).format(DATE_FORMAT[type]);
    }

    /**
     * Displays the messages passed as parameters in the console
     * @param type The type of log to display
     * @param messageList Messages to display
     * @private
     */
    private readonly log = (type: 'info' | 'warn' | 'error', ...messageList: any[]) => {
        if (this.logsEnabled) {
            console[type](this.getCurrentDate() + ':\n', ...messageList);
        }
    }
}
