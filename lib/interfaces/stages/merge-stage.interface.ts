/**
 * Merge Stage Interface
 */
import {StageInterface} from "../core/stage.interface";

export interface MergeStageInterface {
    /**
     * The output collection. Specify either:
     *
     * The collection name as a string to output to a collection in the same database where the aggregation is run. For
     * example:
     *
     * into: "myOutput"
     *
     * The database and collection name in a document to output to a collection in the specified database. For example:
     *
     * into: { db:"myDB", coll:"myOutput" }
     *
     * NOTE
     *
     * If the output collection does not exist, $merge creates the collection:
     *
     * For a replica set or a standalone, if the output database does not exist, $merge also creates the database.
     *
     * For a sharded cluster, the specified output database must already exist.
     *
     * The output collection can be a sharded collection.
     */
    into: any;
    /**
     * Optional. Field or fields that act as a unique identifier for a document. The identifier determines if a results
     * document matches an already existing document in the output collection. Specify either:
     *
     * A single field name as a string. For example:
     *
     * on: "_id"
     *
     * A combination of fields in an array. For example:
     *
     * on: [ "date", "customerId" ]
     *
     * The order of the fields in the array does not matter, and you cannot specify the same field multiple times.
     *
     * For the specified field or fields:
     *
     * The aggregation results documents must contain the field(s) specified in the on, unless the on field is the _id
     * field. If the _id field is missing from a results document, MongoDB adds it automatically.
     * The specified field or fields cannot contain a null or an array value.
     * $merge requires a unique, index with keys that correspond to the on identifier fields. Although the order of the
     * index key specification does not matter, the unique index must only contain the on fields as its keys.
     *
     * The index must also have the same collation as the aggregation’s collation.
     * The unique index can be a sparse index.
     * For output collections that already exist, the corresponding index must already exist.
     * The default value for on depends on the output collection:
     *
     * If the output collection does not exist, the on identifier must be and defaults to the _id field. The
     * corresponding unique _id index is automatically created.
     *
     * TIP
     *
     * To use a different on identifier field(s) for a collection that does not exist, you can create the collection
     * first by creating a unique index on the desired field(s). See the section on non-existent output collection for
     * an example.
     *
     * If the existing output collection is unsharded, the on identifier defaults to the _id field.
     *
     * If the existing output collection is a sharded collection, the on identifier defaults to all the shard key fields
     * and the _id field. If specifying a different on identifier, the on must contain all the shard key fields.
     */
    on?: string | string[];
    /**
     * Optional. The behavior of $merge if a result document and an existing document in the collection have the same
     * value for the specified on field(s).
     *
     * You can specify either:
     *
     * One of the pre-defined action strings:
     *
     * Action	Description
     *
     * “replace”
     *
     * Replace the existing document in the output collection with the matching results document.
     * When performing a replace, the replacement document cannot result in a modification of the _id value or, if the
     * output collection is sharded, the shard key value. Otherwise, the operation results in an error.
     *
     * TIP
     *
     * To avoid this error, if the on field does not include the _id field, remove the _id field in the aggregation
     * results to avoid the error, such as with a preceding $unset stage, etc.
     *
     * “keepExisting”
     *
     * Keep the existing document in the output collection.
     * “merge” (Default)
     * Merge the matching documents (similar to the $mergeObjects operator).
     *
     * If the results document contains fields not in the existing document, add these new fields to the existing
     * document.
     * If the results document contains fields in the existing document, replace the existing field values with those
     * from the results document.
     * For example, if the output collection has the document:
     *
     * { _id: 1, a: 1, b: 1 }
     *
     * And the aggregation results has the document:
     *
     * { _id: 1, b: 5, z: 1 }
     *
     * Then, the merged document is:
     *
     * { _id: 1, a: 1, b: 5, z: 1 }
     *
     * When performing a merge, the merged document cannot result in a modification of the _id value or, if the output
     * collection is sharded, the shard key value. Otherwise, the operation results in an error.
     *
     * TIP
     *
     * To avoid this error, if the on field does not include the _id field, remove the _id field in the aggregation
     * results to avoid the error, such as with a preceding $unset stage, etc.
     *
     * “fail”
     *
     * Stop and fail the aggregation operation. Any changes to the output collection from previous documents are not
     * reverted.
     *
     * An aggregation pipeline to update the document in the collection.
     *
     * [ <stage1>, <stage2> ... ]
     *
     * The pipeline can only consist of the following stages:
     *
     * $addFields and its alias $set
     * $project and its alias $unset
     * $replaceRoot and its alias $replaceWith
     * The pipeline cannot modify the on field’s value. For example, if you are matching on the field month, the
     * pipeline cannot modify the month field.
     *
     * The whenMatched pipeline can directly access the fields of the existing documents in the output collection using
     * $<field>.
     *
     * To access the fields from the aggregation results documents, use either:
     *
     * The built-in $$new variable to access the field, i.e. $$new.<field>. The $$new variable is only available if the
     * let specification is omitted.
     *
     * NOTE
     *
     * Starting in MongoDB 4.2.2, the $$new variable is reserved, and cannot be overridden.
     *
     * The user-defined variables in the let field, i.e. $$<uservariable>.<field>.
     */
    whenMatched?: WhenMatchedType | StageInterface[];
    /**
     * Optional. Specifies variables accessible for use in the whenMatched pipeline
     *
     * Specify a document with the variable name and value expression:
     *
     * { <var_1>: <expression>, ..., <var_n>: <expression> }
     *
     * If unspecified, defaults to { new: "$$ROOT" }; i.e. the whenMatched pipeline can access the $$new variable.
     *
     * NOTE
     *
     * Starting in MongoDB 4.2.2, the $$new variable is reserved, and cannot be overridden.
     *
     * To access the let variables in the whenMatched pipeline, use the double dollar signs ($$) prefix and variable
     * name $$<variable>.
     */
    let?: { [key: string]: any; };
    /**
     * Optional. The behavior of $merge if a result document does not match an existing document in the out collection.
     *
     * You can specify one of the pre-defined action strings:
     *
     * Action	Description
     *
     * “insert” (Default)
     *
     * Insert the document into the output collection.
     *
     * “discard”
     *
     * Discard the document; i.e. $merge does not insert the document into the output collection.
     *
     * “fail”
     *
     * Stop and fail the aggregation operation. Any changes already written to the output collection are not reverted.
     */
    whenNotMatched?: WhenNotMatchedType;
}

export declare type WhenMatchedType = 'replace' | 'keepExisting' | 'merge' | 'fail' | 'pipeline';
export declare type WhenNotMatchedType = 'insert' | 'discard' | 'fail';
