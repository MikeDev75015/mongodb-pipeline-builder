import {StageInterface} from "../core/stage.interface";

/**
 * Lookup Stage Interface
 */
export interface LookupStageInterface {
    /**
     * Specifies the collection in the same database to perform the join with. The from collection cannot be sharded.
     */
    from: string;
    /**
     * Specifies the name of the new array field to add to the input documents. The new array field contains the
     * matching documents from the from collection. If the specified name already exists in the input document, the
     * existing field is overwritten.
     */
    as: string;
    /**
     * Specifies the field from the documents input to the $lookup stage. $lookup performs an equality match on the
     * localField to the foreignField from the documents of the from collection. If an input document does not contain
     * the localField, the $lookup treats the field as having a value of null for matching purposes.
     */
    localField?: string;
    /**
     * Specifies the field from the documents in the from collection. $lookup performs an equality match on the
     * foreignField to the localField from the input documents. If a document in the from collection does not contain
     * the foreignField, the $lookup treats the value as null for matching purposes.
     */
    foreignField?: string;
    /**
     * Optional. Specifies variables to use in the pipeline field stages. Use the variable expressions to access the
     * fields from the documents input to the $lookup stage.
     *
     * The pipeline cannot directly access the input document fields. Instead, first define the variables for the input
     * document fields, and then reference the variables in the stages in the pipeline.
     *
     * NOTE
     *
     * To reference variables in pipeline stages, use the "$$<variable>" syntax.
     *
     * The let variables can be accessed by the stages in the pipeline, including additional $lookup stages nested in
     * the pipeline.
     *
     * A $match stage requires the use of an $expr operator to access the variables. $expr allows the use of aggregation
     * expressions inside of the $match syntax.
     *
     * Without the use of the $expr operator, $match can refer to fields in a document but cannot access variables
     * defined by a $lookup let clause.
     *
     * The $expr operator only uses indexes on the from collection for equality matches. Non-equality match queries,
     * such as range queries, cannot use indexes on the from collection.
     *
     * Other (non-$match) stages in the pipeline do not require an $expr operator to access the variables.
     */
    let?: { [key: string]: any },
    /**
     * Specifies the pipeline to run on the joined collection. The pipeline determines the resulting documents from the
     * joined collection. To return all documents, specify an empty pipeline [].
     *
     * The pipeline cannot include the $out stage or the $merge stage.
     *
     * The pipeline cannot directly access the input document fields. Instead, first define the variables for the input
     * document fields, and then reference the variables in the stages in the pipeline.
     *
     * NOTE
     *
     * To reference variables in pipeline stages, use the "$$<variable>" syntax.
     *
     * The let variables can be accessed by the stages in the pipeline, including additional $lookup stages nested in
     * the pipeline.
     *
     * A $match stage requires the use of an $expr operator to access the variables. $expr allows the use of aggregation
     * expressions inside of the $match syntax.
     *
     * Without the use of the $expr operator, $match can refer to fields in a document but cannot access variables
     * defined by a $lookup let clause.
     *
     * The $expr operator only uses indexes on the from collection for equality matches. Non-equality match queries,
     * such as range queries, cannot use indexes on the from collection.
     *
     *
     * Other (non-$match) stages in the pipeline do not require an $expr operator to access the variables.
     */
    pipeline?: StageInterface[],
}
