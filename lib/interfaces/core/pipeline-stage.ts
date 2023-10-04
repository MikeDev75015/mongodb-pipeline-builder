import {
    BucketStage,
    BucketAutoStage,
    CollStatsStage,
    FacetStage,
    GeoNearStage,
    GraphLookupStage,
    GroupStage,
    LookupStage,
    MergeStage,
    OutStage, ReplaceRootStage, SampleStage, UnionWithStage, UnwindStage
} from "../";

/**
 * interface PipeLineStage
 */
export interface PipeLineStage {
    /**
     * Adds new fields to documents. Similar to $project, $addFields reshapes each document in the stream; specifically,
     * by adding new fields to output documents that contain both the existing fields from the input documents and the
     * newly added fields.
     * $set is an alias for $addFields.
     */
    $addFields?: { [key: string]: any; } | { [key: string]: any; }[];
    /**
     * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
     */
    $bucket?: BucketStage;
    /**
     * Categorizes incoming documents into a specific number of groups, called buckets, based on a specified expression.
     * Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the specified
     * number of buckets.
     */
    $bucketAuto?: BucketAutoStage;
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
     * Processes multiple aggregation pipelines within a single stage on the same set of input documents. Enables the
     * creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a
     * single stage.
     */
    $facet?: FacetStage;
    /**
     * Returns an ordered stream of documents based on the proximity to a geospatial point. Incorporates the functionality
     * of $match, $sort, and $limit for geospatial data. The output documents include an additional distance field and can
     * include a location identifier field.
     */
    $geoNear?: GeoNearStage;
    /**
     * Performs a recursive search on a collection. To each output document, adds a new array field that contains the
     * traversal results of the recursive search for that document.
     */
    $graphLookup?: GraphLookupStage;
    /**
     * Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified,
     * to each group. Consumes all input documents and outputs one document per each distinct group. The output documents
     * only contain the identifier field and, if specified, accumulated fields.
     */
    $group?: GroupStage;
    /**
     * Returns statistics regarding the use of each index for the collection.
     */
    $indexStats?: any;
    /**
     * Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document,
     * outputs either one document (for the first n documents) or zero documents (after the first n documents).
     */
    $limit?: number;
    /**
     * Lists all sessions that have been active long enough to propagate to the system.sessions collection.
     */
    $listSessions?: any;
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
    $match?: any;
    /**
     * Writes the resulting documents of the aggregation pipeline to a collection. The stage can incorporate (insert new
     * documents, merge documents, replace documents, keep existing documents, fail the operation, process documents with
     * a custom update pipeline) the results into an output collection. To use the $merge stage, it must be the last stage
     * in the pipeline.
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
    $planCacheStats?: any;
    /**
     * Reshapes each document in the stream, such as by adding new fields or removing existing fields. For each input
     * document, outputs one document.
     * See also $unset for removing existing fields.
     */
    $project?: { [key: string]: any };
    /**
     * Reshapes each document in the stream by restricting the content for each document based on information stored in
     * the documents themselves. Incorporates the functionality of $project and $match. Can be used to implement field
     * level redaction. For each input document, outputs either one or zero documents.
     */
    $redact?: any;
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
    $replaceWith?: any;
    /**
     * Randomly selects the specified number of documents from its input.
     */
    $sample?: SampleStage;
    /**
     * Performs a full-text search of the field or fields in an Atlas collection.
     * $search is only available for MongoDB Atlas clusters, and is not available for self-managed deployments.
     */
    $search?: any;
    /**
     * Adds new fields to documents. Similar to $project, $set reshapes each document in the stream; specifically, by
     * adding new fields to output documents that contain both the existing fields from the input documents and the
     * newly added fields.
     * $set is an alias for $addFields stage.
     */
    $set?: { [key: string]: any };
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
    $sort?: { [key: string]: any };
    /**
     * Groups incoming documents based on the value of a specified expression, then computes the count of documents in
     * each distinct group.
     */
    $sortByCount?: any;
    /**
     * Performs a union of two collections; i.e. combines pipeline results from two collections into a single result
     * set.
     */
    $unionWith?: UnionWithStage;
    /**
     * Removes/excludes fields from documents.
     * $unset is an alias for $project stage that removes fields.
     */
    $unset?: string | string[];
    /**
     * Deconstructs an array field from the input documents to output a document for each element. Each output document
     * replaces the array with an element value. For each input document, outputs n documents where n is the number of
     * array elements and can be zero for an empty array.
     */
    $unwind?: string | UnwindStage;
}
